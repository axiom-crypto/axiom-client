import {
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  AxiomV2QueryOptions,
  DataSubquery,
  AxiomV2QueryBuilder,
  AxiomV2QueryBuilderConfig,
} from "@axiom-crypto/circuit";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { getMaxFeePerGas } from "./axiom/utils";
import { AbiType, AxiomV2ClientOptions, AxiomV2SendQueryArgs } from "./types";
import { encodeFullQueryV2 } from "@axiom-crypto/core/packages/tools";
import { calculateFeeDataExtended, calculatePayment } from "./lib/paymentCalc";
import { viemChain } from "./lib/viem";
import { getAxiomV2Abi, getAxiomV2QueryAddress } from "./lib";

export const buildSendQuery = async (input: {
  queryBuilder: AxiomV2QueryBuilder;
  dataQuery: DataSubquery[];
  computeQuery: AxiomV2ComputeQuery;
  callback: AxiomV2Callback;
  caller: string;
  options: AxiomV2ClientOptions;
}): Promise<AxiomV2SendQueryArgs> => {
  const validate = input.options?.overrides?.validateBuild ?? true;
  if (input.options.refundee === undefined) {
    throw new Error("Refundee is required");
  }
  let options = { ...input.options };
  if (options.maxFeePerGas == undefined) {
    options.maxFeePerGas = await getMaxFeePerGas(input.queryBuilder, input.options?.overrides);
  }

  const chainId = input.queryBuilder.config.sourceChainId.toString();
  const axiomQueryAddress = options?.overrides?.queryAddress ?? getAxiomV2QueryAddress(chainId);
  const abi = getAxiomV2Abi(AbiType.Query);

  const publicClient = createPublicClient({
    chain: viemChain(chainId, input.queryBuilder.config.providerUri),
    transport: http(input.queryBuilder.config.providerUri),
  });

  const feeDataExtended = await calculateFeeDataExtended(chainId, publicClient, options);
  const payment = await calculatePayment(chainId, publicClient, feeDataExtended);

  const config: AxiomV2QueryBuilderConfig = {
    provider: input.queryBuilder.config.providerUri,
    sourceChainId: input.queryBuilder.config.sourceChainId.toString(),
    targetChainId: input.queryBuilder.config.targetChainId.toString(),
    version: input.queryBuilder.config.version,
    mock: input.queryBuilder.config.mock,
    refundee: input.options.refundee ?? input.caller,
  };
  const queryBuilder = new AxiomV2QueryBuilder(
    config,
    undefined,  // dataQuery; we set this as a setBuiltDataQuery below
    input.computeQuery,
    input.callback,
    feeDataExtended,
  );

  if (input.dataQuery.length > 0) {
    queryBuilder.setBuiltDataQuery({
      sourceChainId: chainId,
      subqueries: input.dataQuery,
    }, true);
  }
  const {
    queryHash,
    dataQueryHash,
    computeQuery,
    callback,
    feeData,
    userSalt,
    refundee,
    dataQuery,
  } = await queryBuilder.build(validate);
  const id = await queryBuilder.getQueryId(input.caller);

  let sendQueryArgs: any;
  if (!input.options.ipfsClient) {
    sendQueryArgs = {
      address: axiomQueryAddress as `0x${string}`,
      abi: abi,
      functionName: "sendQuery",
      value: payment,
      args: [
        chainId,
        dataQueryHash,
        computeQuery,
        callback,
        feeData,
        userSalt,
        refundee,
        dataQuery,
      ],
      queryId: id,
      mock: queryBuilder.config.mock,
    };
  } else {
    const encodedQuery = encodeFullQueryV2(
      chainId,
      refundee,
      {
        sourceChainId: chainId,
        subqueries: input.dataQuery,
      },
      computeQuery,
      callback,
      feeData,
      userSalt,
      refundee,
    );
    const pinRes = await input.options.ipfsClient.pin(encodedQuery);
    if (pinRes.status - 200 > 99) {
      throw new Error(`Failed to write data to IPFS. Status: ${pinRes.status}`);
    }
    const ipfsHash = pinRes.value as string;
    sendQueryArgs = {
      address: axiomQueryAddress as `0x${string}`,
      abi: abi,
      functionName: "sendQueryWithIpfsData",
      value: payment,
      args: [
        queryHash,
        ipfsHash,
        callback,
        feeData,
        userSalt,
        refundee,
      ],
      queryId: id,
      mock: queryBuilder.config.mock,
    };
  }

  const calldata = encodeFunctionData(sendQueryArgs);
  return {
    ...sendQueryArgs,
    calldata,
  };
};

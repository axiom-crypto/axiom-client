import { circuit as circuit0 } from "./circuits/queryId/basic.circuit";
import compiledCircuit0 from "./circuits/queryId/basic.compiled.json";
import { Axiom } from "../../src";
import { bytes32 } from "@axiom-crypto/core";

describe("QueryID Integration Tests", () => {
  test("check queryId matches emitted event", async () => {
    const axiom = new Axiom({
      circuit: circuit0,
      compiledCircuit: compiledCircuit0,
      chainId: "11155111",  // Sepolia
      provider: process.env.PROVIDER_URI_SEPOLIA as string,
      privateKey: process.env.PRIVATE_KEY_SEPOLIA as string,
      callback: {
        target: "0x4A4e2D8f3fBb3525aD61db7Fc843c9bf097c362e",
      },
    });
    await axiom.init();
    const args = await axiom.prove({});
    const receipt = await axiom.sendQuery(args);
    expect(receipt.status).toBe('success');

    const queryInitiatedOnChainEvent = receipt.logs[1];
    const onchainQueryId = queryInitiatedOnChainEvent.topics[3];
    expect(bytes32(args.queryId)).toEqual(onchainQueryId);
  }, 60000);
});
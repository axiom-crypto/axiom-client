import { ethers } from "ethers";
import {
  AxiomV2QueryBuilderBase,
  AxiomV2QueryBuilderBaseConfig,
  AccountField,
  AccountSubquery,
  AxiomV2ComputeQuery,
  AxiomV2QueryOptions,
  ReceiptField,
} from "../../../src";
import { resizeArray } from "../../../src/utils";

// Test coverage areas:
// - DataQuery
// - ComputeQuery
// - Callback
// - Options

describe("Build Query w/ ComputeQuery, DataQuery, Callback, and Options set (core test)", () => {
  const BLOCK_NUMBER = 15537394;
  const WETH_ADDR = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const WETH_WHALE = "0x2E15D7AA0650dE1009710FDd45C3468d75AE1392";
  const WSOL_ADDR = "0xd31a59c85ae9d8edefec411d448f90841571b89c";
  const UNI_V3_FACTORY_ADDR = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URI);

  const computeQuery: AxiomV2ComputeQuery = {
    k: 13,
    resultLen: 1,
    vkey: [
      "0x4caffbbdc5d29b00b3e97df7fb169baadaff9443ea3ecfd62231541d2752e003",
      "0xc04b25057d0bddf35d4542077516abb76445b8e745a457e3ccc1bf9aac2ba406",
      "0x6f4cebf257ebe7a319dd5dedcd41085d35b11afe7254a55d5f33366084983a61",
      "0xce36e621969a1e33547280e28d8158537284eb5b5d284ede4dc81d1e69ef2e28",
      "0x0000000000000000000000000000000000000000000000000000000000000080",
      "0x0000000000000000000000000000000000000000000000000000000000000080",
      "0x0000000000000000000000000000000000000000000000000000000000000080",
      "0xceb30489e39186b75336db29c5e0ce27e0c7480fc5a8ee071fc8642283700e42",
      "0x4570a761b654d0422dba9042e1c2130284cca09e659d46b69739c99697ff4068",
      "0x22e4c62aacfc240ed0553bfad00122ba8c7627c870c739f3f818584e066a8b1f",
      "0x841485e0a9f109688bdc4f5ff851d9e2e44833ae573456742c1237322e938542",
      "0x79a62f1cc2f1440cc9fdcd534b612a49da4b6139bbed8cf53a26f4568ac3f567",
      "0x63bf6c5c2a2c6a568d6399d6658a320511dda5caf1dc5a84af03472a552ee510",
      "0x1f3d22024e669b91ee856e925fcbe0b6da642b57b348823bf7ac26266b3e695d",
    ],
    computeProof:
      "0x00000000000000000000000000000000000000000000000000000000000000960000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ca0d58f038fa1dea93aac4ae41d157f0894c4d857468a9da2d8999721f5691209442ccfd19f64af56d033662e58c382db23a6693a591a22e2706a9a7527c1f041e4ca2d69d9aec9cd4203ce4cf181dda917e93db04afd78953f872112797c710b38aa8b8c774c4f56bf471ac233b27f87791647e18d70be18f28570a4c948548a137f0d62b925e4f0f0c8b2c8de36c2c1c54b63061619cb391dc117d72dcea16ec2f0173413814f94fd7ab61bf134aab9cf7bf453d246d6a25746576377e8806eccf2692cab5ffd4d443e9ac325a479dcd51b72b9123f39a7ac77d94333469629987d1f0209effc6d3f71b9ed1622bc1e6fc68c575725eaf2bca1ae3674ee44ca652f57b0da21ecb9413d083cdeabe8e52d255177621112c3b3a22daf8eec7074c6e4ec115313e94a935e632ac5226a232abfb0910b3e5ff8a6ea58855028948d093f98691bac135ab827597dd3291bd7372298c4cc028af1b710972776f106637331c92b893f3db7a85c480f26a7083fe3052ec48c1360b42929ef950e643279fbb17dbef72b8e87321b8e8b911383a0913ecd1789960428aafd24d7939d45148e89f457178c188b065cf233f69a26d0195e8e9853e973fdfd3015612bae12b0f18ffa2e18550a7195beff3d684841ecf3cb869ba9668fda32514d83fcc801bbd72d06f730773bae66310f62c6eac2f58d6a88826adb520ef0c9b87ee7c371c40b6f73f27226ab90f0594860c30d892d4082925d83d8a7cfe885b743e49481a1b685dcefe3d8029e70d875b9b4902ac0a82895175881cd0a354090c0b1c9903465eb370ed07dbd3eba1367ec17095ea20278a6db3055f45b85be5862ceaa92b0cf0c3cb2f8f6df24a598f1b45c0f60a4308b44ce630c3e97c385aa664756500d6ea8cd7069d2b9fb8c0b389a9b325cca515a0e3a0498ca8ce67ef920358b12959761f8d863b39ee4e8036e816a110d1f4637f65c68d5ef3a9ba50f059aec10e39e9652b6594d85c86dd9b98889d7b854e5e3a4674cb54d66dff547409165f235637f037c8dc693649eebf8e6cede4474a92e3ac4091cc0eea855f0790ed8e06bffc7ddd79222f3423209826f6c99279f0f709a04a58de67d9ae12aeb1bc38261907ab51f8f4025cded6cfa1d54acccf85a39834721865723a9560dca880310a1444588fa6fa6cf1caa6d5282e0a401861cf4d7dbc60449086014e076f673c2f7eb23a6204f697d6209bca33b52453de1841c683390ac3f03eedcdfb1b92941f0c6c1e92c687955f343eec30f71cf78d8ff1ee4c38d44c19acd01e5fd910682391b066e657a08ef28362f40f918963b4228d657280688dafab61b4063c760d1ed8562c1b061850b49054f0816858a574bd79bb8d592423ea1d7f02b617b01e06327e6c6f120c69866bf81203ec2ebb274e118b44e87fe2e30dd77882de784b11243f41f5200ede478cb14c5c24c117fa987e149ccb67b7a7f758e26250158c20c515702aa9c28af2ea51cc9e135d6d635b3ddc259d5f5713a5615333f277a805b452afe6ec4205b927793ab473fc3fa40631d9d9cf365067a4c78906b7119b19e66f13936c69f4db1db9005b89187657772eae05d81530375d9def9fcff1450a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ed4d210ce92739ea5af0066601fcc2a43a9ae8ccc8a49f1008940b5066c2326f419c6da9fbd9481ca099e405aa18403a4188d21832ee58a39975d6a9a49ea1bba8d1de4811547f6e3aa1d684c0c0cd57443729dbcf201ac20704a553d0b6b20a9cdb94058c8deb216792b9ef0ca51a26c54ca23e460b2b191ce6af8784bff2f90fc0a4ec281dd95beee516d3e15a04fb873038b949c44db2fb0ee943f6bfa1d4f2ff763d865adf55a29b37bee0f6ad8754fde6999125b6a779056d4bdf95b13ac41d86d841adec49bf27a7414b88074f27a975ee36d5f647f7dcbcc580df20e4d7e040bbb2c6c2a6dc5f18737259dee588657cbbe225ebd66fac66ca3386d16a9bef9c4664733a2619a50be2ac5a8f4ce7f272b4686526681415e79ff3baf0881d52948b3fc7d0b5d413d44a1cb985d4557ff651042fd2c8180fe9528b9cb1f400da2686d602ebbe2e24d6d6b0c9e12d6ba41c1db556ee1ecce44fe8513e0104353210ebba3f83cfd38b84509c47245cfa4544189949997fe36e96fcb68b10495d6632a553da9f1f1dec8251018793d44e30a30bf874fc56abeb9facdd04a25a1bd9fe412949086db288d3326b80b48e4d85ec44de11a8767032c1569c472141f44f80531c0becccbf5791f65ef4d21a6529a908b7e5386f5c9169d20082813684ee79e7ce7ddc0497301321f5fbda44ecaac3c157cf00c28d432411528f405c8ee72147fcd0ab094b58914163c875cca43bd1724ee1b448137e5afbe38bf24be5c46aa67200f1e19a9cd4c9abfa91af60f54751220c189206d64c314fe1622d827025d39024eb329090c2b496490306a52f721bb8e41f41266262b899c420ea10ef2211821bbcbcc3ae427053b97d3a6a3d3133893f373adab42c8d8e20a0beb5d12246bc590c4424fddcc8511c594fdcfa23fa55ed2a89af28947fc9e5f1f081992a5f470977f7c7e38ceaa69cc5d43ee604cd5bf6c4a5a861960f3c10e1c306c1e0999a0ac0b6e565e6bc205de0d807e7b3a686d03b559b040c0cd332518b1289a02a889400211e1e84f038faac5966e5d927f025c3ed0b0149644646f11d91d524604313e3382d86310325d000e462fb5705776ad3dd10ced1d3889f829370e0aa9669d80239514dad97bbfdd5bde7e5d74d341d45b9827cccf1ce57d0d",
  };

  test("should initialize with private key; build QueryV2 with dataQuery, computeQuery, and callback", async () => {
    const config: AxiomV2QueryBuilderBaseConfig = {
      providerUri: process.env.PROVIDER_URI_SEPOLIA as string,
      version: "v2",
    };

    const dataQueryReq = [
      {
        blockNumber: BLOCK_NUMBER,
        fieldIdx: 0,
      },
      {
        blockNumber: BLOCK_NUMBER + 1,
        fieldIdx: 1,
      },
      {
        blockNumber: BLOCK_NUMBER,
        addr: WETH_WHALE,
        fieldIdx: AccountField.Nonce,
      },
      {
        blockNumber: 17975259,
        txIdx: 34,
        // txHash: "0x47082a4eaba054312c652a21c6d75a44095b8be43c60bdaeffad03d38a8b1602",
        fieldOrLogIdx: ReceiptField.CumulativeGas,
        topicOrDataOrAddressIdx: 10,
        eventSchema: ethers.ZeroHash,
      },
    ];
    const computeQueryReq: AxiomV2ComputeQuery = {
      k: 14,
      vkey: computeQuery.vkey,
      computeProof: computeQuery.computeProof,
    };

    const axiom = new AxiomV2QueryBuilderBase(config, dataQueryReq, computeQueryReq);
    const unbiltDq = axiom.getDataQuery();
    expect((unbiltDq?.[2] as AccountSubquery).addr).toEqual(WETH_WHALE);
    await axiom.buildBase();
    const builtQuery = axiom.getBuiltQueryBase();
    if (builtQuery === undefined) {
      throw new Error("builtQuery is undefined");
    }

    const builtDq = builtQuery.dataQueryStruct.subqueries;
    expect((builtDq?.[2].subqueryData as AccountSubquery).addr).toEqual(WETH_WHALE.toLowerCase());
    expect(builtQuery.queryHash).toEqual("0xf83d8c1a06ca57e6ac62998276ce1f4e091a28f93e8edcefb34682c30c34450c");
    expect(builtQuery.dataQueryHash).toEqual("0xa23b68c6445bf7850bfdb0921bef5c55d43bd6362133b1f3929dd7b8103502dd");
    expect(builtQuery.dataQuery).toEqual(
      "0x00000000000000010004000100ed14f200000000000100ed14f300000001000200ed14f22e15d7aa0650de1009710fdd45c3468d75ae1392000000000005011247db0022000000020000000a0000000000000000000000000000000000000000000000000000000000000000",
    );
    expect(builtQuery.computeQuery.k).toEqual(computeQueryReq.k);
    expect(builtQuery.computeQuery.resultLen).toEqual(4);
    expect(builtQuery.computeQuery.vkey.length).toEqual(computeQueryReq.vkey.length);
    expect(builtQuery.computeQuery.vkey).toEqual(
      resizeArray(computeQueryReq.vkey, computeQueryReq.vkey.length, ethers.ZeroHash),
    );
    expect(builtQuery.computeQuery.computeProof).toEqual(computeQuery.computeProof);
  });

  test("should initialize without private key; build QueryV2 with dataQuery, computeQuery, and callback", async () => {
    const config: AxiomV2QueryBuilderBaseConfig = {
      providerUri: process.env.PROVIDER_URI_SEPOLIA as string,
      version: "v2",
    };

    const dataQueryReq = [
      {
        blockNumber: BLOCK_NUMBER,
        fieldIdx: 0,
      },
      {
        blockNumber: BLOCK_NUMBER + 1,
        fieldIdx: 1,
      },
      {
        blockNumber: BLOCK_NUMBER,
        addr: WETH_WHALE,
        fieldIdx: AccountField.Nonce,
      },
      {
        blockNumber: 17975259,
        txIdx: 34,
        // txHash: "0x47082a4eaba054312c652a21c6d75a44095b8be43c60bdaeffad03d38a8b1602",
        fieldOrLogIdx: ReceiptField.CumulativeGas,
        topicOrDataOrAddressIdx: 10,
        eventSchema: ethers.ZeroHash,
      },
    ];
    const computeQueryReq: AxiomV2ComputeQuery = {
      k: 14,
      vkey: computeQuery.vkey,
      computeProof: computeQuery.computeProof,
    };
    const callbackQuery = {
      target: WETH_ADDR,
      extraData: ethers.solidityPacked(["address"], [WETH_WHALE]),
    };
    const options: AxiomV2QueryOptions = {
      maxFeePerGas: BigInt(100000000).toString(),
    };

    const axiom = new AxiomV2QueryBuilderBase(config, dataQueryReq, computeQueryReq);
    const unbiltDq = axiom.getDataQuery();
    expect((unbiltDq?.[2] as AccountSubquery).addr).toEqual(WETH_WHALE);
    await axiom.buildBase();
    const builtQuery = axiom.getBuiltQueryBase();
    if (builtQuery === undefined) {
      throw new Error("builtQuery is undefined");
    }

    const builtDq = builtQuery.dataQueryStruct.subqueries;
    expect((builtDq?.[2].subqueryData as AccountSubquery).addr).toEqual(WETH_WHALE.toLowerCase());
    expect(builtQuery.queryHash).toEqual("0xf83d8c1a06ca57e6ac62998276ce1f4e091a28f93e8edcefb34682c30c34450c");
    expect(builtQuery.dataQueryHash).toEqual("0xa23b68c6445bf7850bfdb0921bef5c55d43bd6362133b1f3929dd7b8103502dd");
    expect(builtQuery.dataQuery).toEqual(
      "0x00000000000000010004000100ed14f200000000000100ed14f300000001000200ed14f22e15d7aa0650de1009710fdd45c3468d75ae1392000000000005011247db0022000000020000000a0000000000000000000000000000000000000000000000000000000000000000",
    );
    expect(builtQuery.computeQuery.k).toEqual(computeQueryReq.k);
    expect(builtQuery.computeQuery.resultLen).toEqual(4);
    expect(builtQuery.computeQuery.vkey.length).toEqual(computeQueryReq.vkey.length);
    expect(builtQuery.computeQuery.vkey).toEqual(
      resizeArray(computeQueryReq.vkey, computeQueryReq.vkey.length, ethers.ZeroHash),
    );
    expect(builtQuery.computeQuery.computeProof).toEqual(computeQuery.computeProof);
  });
});
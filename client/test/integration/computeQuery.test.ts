import { Axiom } from "../../src";
import { circuit as circuit0 } from "./circuits/computeQuery/simple.circuit";
import compiledCircuit0 from "./circuits/computeQuery/simple.compiled.json";
import inputs0 from "./circuits/computeQuery/simple.inputs.json";

describe("Build ComputeQuery with DataQuery", () => {
  test("simple computeQuery with dataQuery", async () => {
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
    await axiom.prove(inputs0);
    const receipt = await axiom.sendQuery();
    expect(receipt.status).toBe('success');
  }, 60000);

  test("simple computeQuery with dataQuery and address override", async () => {
    const chainIdOverride = "8453";
    const addressOverride = "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";

    const axiom = new Axiom({
      circuit: circuit0,
      compiledCircuit: compiledCircuit0,
      chainId: chainIdOverride,  // Base
      provider: process.env.PROVIDER_URI_SEPOLIA as string,
      privateKey: process.env.PRIVATE_KEY_SEPOLIA as string,
      callback: {
        target: "0x4A4e2D8f3fBb3525aD61db7Fc843c9bf097c362e",
      },
      options: {
        overrides: {
          queryAddress: addressOverride,
        }
      }
    });
    await axiom.init();
    await axiom.prove(inputs0);
    const args = axiom.getSendQueryArgs();
    if (!args) {
      throw new Error("Unable to get sendQuery args.");
    }
    expect(args.args[0]).toBe(chainIdOverride)
    expect(args.address).toBe(addressOverride);
  }, 60000);
});

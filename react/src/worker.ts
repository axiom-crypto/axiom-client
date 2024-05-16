import { AxiomBaseCircuit } from "@axiom-crypto/client/web/";
import { expose } from "comlink";
import { AxiomV2CircuitCapacity } from "@axiom-crypto/client";

export class AxiomCircuit extends AxiomBaseCircuit<any> {
    constructor(inputs: {
        chainId: number | string | bigint,
        rpcUrl: string,
        inputSchema?: string,
        shouldTime?: boolean,
        capacity?: AxiomV2CircuitCapacity,
        f: string,
    }) {
        const decodedArray = Buffer.from(inputs.f, 'base64');
        const decoder = new TextDecoder();
        const raw = decoder.decode(decodedArray);
        const AXIOM_CLIENT_IMPORT = require("@axiom-crypto/client");
        super({
            ...inputs,
            f: eval(raw),
        });
    }
}

expose(AxiomCircuit);
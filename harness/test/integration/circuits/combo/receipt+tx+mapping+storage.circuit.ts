import {
  add,
  addToCallback,
  CircuitValue,
  constant,
  getHeader,
  getReceipt,
  getSolidityMapping,
  getStorage,
  getTx,
  mul,
} from "@axiom-crypto/client";

export interface CircuitInputs {
  blockNumber: CircuitValue;
  contract0: CircuitValue;
  contract1: CircuitValue;
}

export const defaultInputs = {
  blockNumber: 4000000, //$ account.eoa[8].blockNumber
  contract0: "0xEaa455e4291742eC362Bc21a8C46E5F2b5ed4701", //$ storage.nonzero[8].address
  contract1: "0xEaa455e4291742eC362Bc21a8C46E5F2b5ed4701", //$ storage.nonzero[9].address
};

export const circuit = async (inputs: CircuitInputs) => {
  for (let i = 0; i < 8; i++) {
    let tx = getReceipt(inputs.blockNumber.number() - 50 + i, i);
    addToCallback(await tx.cumulativeGas());
  }

  for (let i = 0; i < 8; i++) {
    let tx = getTx(inputs.blockNumber.number() + i, 10 + i);
    addToCallback(await tx.r());
  }

  for (let i = 0; i < 4; i++) {
    let mapping = getSolidityMapping(inputs.blockNumber.number() + i, inputs.contract0, 1);
    addToCallback(await mapping.key(2));
  }

  for (let i = 0; i < 3; i++) {
    const acct = getStorage(add(inputs.blockNumber, i), inputs.contract1);
    addToCallback(await acct.slot(i));
  }
}
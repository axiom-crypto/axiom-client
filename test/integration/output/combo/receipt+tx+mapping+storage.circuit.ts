import { 
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getHeader,
  getAccount,
  getStorage,
  getReceipt,
  getTx,
  getSolidityMapping,
  addToCallback,
  add,
  mul,
  sub,
  div,
  mod,
  pow,
  neg,
  mulAdd,
  mulNot,
  assertBit,
  assertIsConst,
  innerProduct,
  and,
  or,
  not,
  dec,
  select,
  orAnd,
  bitsToIndicator,
  idxToIndicator,
  selectByIndicator,
  selectFromIdx,
  isZero,
  isEqual,
  numToBits,
  checkEqual,
  rangeCheck,
  checkLessThan,
  isLessThan,
  poseidon,
  value,
  log,
  ecdsaBenchmark,
  newCircuitValue256,
  loadBn254Fq,
  convertBn254FqToCircuitValue256,
  loadBn254G1,
  bn254G1Sum,
  bn254G1SubUnequal,
  loadBn254G2,
  bn254G2Sum,
  bn254PairingCheck,
  loadSecp256k1Pubkey,
} from "@axiom-crypto/client";

export const inputs = {
  // $input
};
export type CircuitInputType = typeof inputs;
export interface CircuitInputs extends CircuitInputType { }
export interface CircuitValueInputs {
  // $typeInputs
}
export const circuit = async ({
  // $cvInputs
}: CircuitValueInputs) => {

for (let i = 0; i < 8; i++) {
  let tx = getReceipt(9000050 + i, i);
  addToCallback(await tx.cumulativeGas());
}

for (let i = 0; i < 8; i++) {
  let tx = getTx(9000000 + i, 10 + i);
  addToCallback(await tx.r());
}

for (let i = 0; i < 4; i++) {
  let mapping = getSolidityMapping(9730000 + i, "0x8dde5d4a8384f403f888e1419672d94c570440c9", 1);
  addToCallback(await mapping.key(2));
}

const blockNumber = constant(5000000);
for (let i = 0; i < 3; i++) {
  const acct = getStorage(add(blockNumber, i), "0xc76531Bb08e8E266E4eB8a988D314AA6650292af");
  addToCallback(await acct.slot(i));
}

};
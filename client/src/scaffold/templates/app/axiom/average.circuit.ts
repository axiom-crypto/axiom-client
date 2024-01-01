import {
  add,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  getAccount,
} from "@axiom-crypto/client";

/// For type safety, define the input types to your circuit here.
/// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  address: CircuitValue;
}

export const circuit = async ({
  blockNumber,
  address,
}: CircuitInputs) => {
  // Since the blockNumber is a variable input, let's add it to the results that will be sent to my callback function:
  addToCallback(blockNumber);
  addToCallback(address);

  const account = getAccount(blockNumber, address);

  // We add a subquery for the account nonce. Note you need to `await`!
  const bigNonce = await account.nonce();

  // The default return value is `CircuitValue256`, but the nonce should always fit in `uint128` so we can cast it:
  const nonce = bigNonce.toCircuitValue();

  // As an example of additional compute, we increment the nonce by 1
  const incNonce = add(nonce, constant(1));

  // We add the result to the callback
  addToCallback(incNonce);
};

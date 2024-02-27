import { AxiomV2FieldConstant, DataSubqueryType, HeaderField, HeaderSubquery } from "@axiom-crypto/tools";
import { CircuitValue, RawCircuitInput, CircuitValue256 } from "@axiom-crypto/halo2-lib-js";
import { getCircuitValueConstant, getCircuitValueWithOffset, lowercase } from "../utils";
import { prepData } from "./data";

type HeaderEnumKeys = Uncapitalize<keyof typeof HeaderField>;
type HeaderEnumKeyFieldsUnfiltered = { [key in HeaderEnumKeys]: () => Promise<CircuitValue256> };
type HeaderEnumKeyFields = Omit<HeaderEnumKeyFieldsUnfiltered, "logsBloom">;
export interface Header extends HeaderEnumKeyFields {
  /**
   * Retrieves a 32 byte chunk of the logs bloom.
   *
   * @param logsBloomIdx - The index of the 32 byte chunk in [0,8)
   * @returns A `CircuitValue256` in representing the 32 byte chunk of the logs bloom.
   */
  logsBloom: (logsBloomIdx: RawCircuitInput) => Promise<CircuitValue256>;
};

export const buildHeader = (blockNumber: CircuitValue) => {

  const getSubquery = (fieldIdx: CircuitValue) => {
    let headerSubquery: HeaderSubquery = {
      blockNumber: blockNumber.number(),
      fieldIdx: fieldIdx.number()
    };
    const dataSubquery = { subqueryData: headerSubquery, type: DataSubqueryType.Header };
    return prepData(dataSubquery, [blockNumber, fieldIdx]);
  }

  const functions = Object.fromEntries(
    Object.keys(HeaderField).map((key) => {
      return [lowercase(key), () => {
        const headerField = getCircuitValueConstant(HeaderField[key as keyof typeof HeaderField])
        return getSubquery(headerField);
      }]
    })
  ) as HeaderEnumKeyFields;

  const logsBloom = async (logsBloomIdxRaw: RawCircuitInput) => {

    if (logsBloomIdxRaw as any instanceof CircuitValue) {
      throw new Error("logsBloomIdxRaw must be a constant (not a CircuitValue)");
    }

    const logsBloomIdx = getCircuitValueConstant(logsBloomIdxRaw);

    if (logsBloomIdx.number() < 0 || logsBloomIdx.number() >= 8) {
      throw new Error("logsBloomIdx range is [0,8)");
    }
    const logIdxProcessed = getCircuitValueWithOffset(logsBloomIdx, AxiomV2FieldConstant.Header.LogsBloomFieldIdxOffset);
    return getSubquery(logIdxProcessed);
  }

  const functionsWithLogsBloom: Header = { ...functions, logsBloom };

  return Object.freeze(functionsWithLogsBloom);
}

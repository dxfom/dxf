import { DxfRecordReadonly } from './Dxf'

export const getGroupCodeValues = (record: DxfRecordReadonly | undefined, groupCode: number): string[] => {
  const values: string[] = []
  if (record) {
    for (const groupCodes of record) {
      if (groupCodes[0] === groupCode) {
        values.push(groupCodes[1])
      }
    }
  }
  return values
}

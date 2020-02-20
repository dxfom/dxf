import { DxfRecordReadonly } from './Dxf'

export const getGroupCodeValue = (record: DxfRecordReadonly | undefined, groupCode: number): string | undefined => {
  if (record) {
    for (const groupCodes of record) {
      if (groupCodes[0] === groupCode) {
        return groupCodes[1]
      }
    }
  }
}

import { Dxf, DxfRecord } from './Dxf'
import { getGroupCodeValue } from './getGroupCodeValue'

const createObject = (): object => Object.create(null)

const dxfSectionHandler = (name: string, groupCodes: DxfRecord): any => {
  switch (name) {
    default: {
      const result: DxfRecord[] = []
      let currentRecord: DxfRecord = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          result.push(currentRecord = [])
        }
        currentRecord.push(groupCode)
      }
      return result
    }

    case 'HEADER': {
      const result: NonNullable<Dxf[typeof name]> = createObject()
      let currentRecord: NonNullable<typeof result['']> = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 9) {
          result[groupCode[1]] = currentRecord = []
        } else {
          currentRecord.push(groupCode)
        }
      }
      return result
    }

    case 'CLASSES': {
      const result: NonNullable<Dxf[typeof name]> = createObject()
      let currentRecord: NonNullable<typeof result['']> = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          currentRecord = []
        } else if (groupCode[0] === 1) {
          result[groupCode[1]] = currentRecord
        } else {
          currentRecord.push(groupCode)
        }
      }
      return result
    }

    case 'TABLES': {
      const result: NonNullable<Dxf[typeof name]> = createObject()
      let currentTable: DxfRecord[] = []
      let currentRecord: DxfRecord = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          currentRecord = []
          if (groupCode[1] === 'TABLE') {
            currentTable = [currentRecord]
          } else if (groupCode[1] !== 'ENDTAB') {
            currentTable.push(currentRecord)
          }
        } else if (groupCode[0] === 2) {
          if (getGroupCodeValue(currentRecord, 0) === 'TABLE') {
            result[groupCode[1]] = currentTable
          }
        }
        currentRecord.push(groupCode)
      }
      return result
    }

    case 'BLOCKS': {
      const result: NonNullable<Dxf[typeof name]> = createObject()
      let currentBlock: DxfRecord[] = []
      let currentRecord: DxfRecord = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          currentRecord = []
          if (groupCode[1] === 'BLOCK') {
            currentBlock = [currentRecord]
          } else {
            currentBlock.push(currentRecord)
          }
        } else if (groupCode[0] === 2) {
          if (getGroupCodeValue(currentRecord, 0) === 'BLOCK') {
            result[groupCode[1]] = currentBlock
          }
        }
        currentRecord.push(groupCode)
      }
      return result
    }

    case 'OBJECTS': {
      const result: NonNullable<Dxf[typeof name]> = []
      let currentRecord: DxfRecord = []
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          result.push(currentRecord = [])
        }
        currentRecord.push(groupCode)
      }
      return result
    }

    case 'ACDSDATA': {
      let currentRecord: DxfRecord = []
      let currentGroup: DxfRecord[] = [currentRecord]
      const result: NonNullable<Dxf[typeof name]> = [currentGroup]
      for (const groupCode of groupCodes) {
        if (groupCode[0] === 0) {
          result.push(currentGroup = [])
          currentGroup.push(currentRecord = [])
        } else if (groupCode[0] === 2) {
          currentGroup.push(currentRecord = [])
        }
        currentRecord.push(groupCode)
      }
      return result
    }
  }
}

function splitDxfFileStringIntoDxfCodeValuePairs(dxfString: string) {
  const lines = dxfString.split(/\r\n|\r|\n/)
  const size = Math.floor(lines.length / 2)
  const codes: DxfRecord = Array(size)
  for (let i = 0; i < size; i++) {
    codes[i] = [parseInt(lines[i + i], 10), lines[i + i + 1]]
  }
  return codes
}

/**
 * http://help.autodesk.com/view/OARX/2019/JPN/?guid=GUID-0946C3A3-6739-4512-AEF6-1E6020109987
 */
function splitDxfSections(codes: DxfRecord) {
  const sections: { name: string, startIndex: number, endIndex: number }[] = []
  for (let i = 1; i < codes.length; i++) {
    if (codes[i - 1][0] === 0 && codes[i - 1][1] === 'SECTION' && codes[i][0] === 2) {
      const sectionNameIndex = i
      while (++i < codes.length && (codes[i][0] !== 0 || codes[i][1] !== 'ENDSEC'));
      sections.push({
        name: codes[sectionNameIndex][1],
        startIndex: sectionNameIndex + 1,
        endIndex: i,
      })
    }
  }
  return sections
}

export const parseDxfFileStringSingleSection = <S extends keyof Dxf>(
  dxfString: string,
  sectionName: S,
): Dxf[S] | undefined => {
  const codes = splitDxfFileStringIntoDxfCodeValuePairs(dxfString)
  for (const { name, startIndex, endIndex } of splitDxfSections(codes)) {
    if (name === sectionName) {
      return dxfSectionHandler(name, codes.slice(startIndex, endIndex))
    }
  }
}

export const parseDxfFileString = (dxfString: string): Dxf => {
  const result: Record<string, any> = Object.create(null)
  const codes = splitDxfFileStringIntoDxfCodeValuePairs(dxfString)
  for (const { name, startIndex, endIndex } of splitDxfSections(codes)) {
    result[name] = dxfSectionHandler(name, codes.slice(startIndex, endIndex))
  }
  return result
}

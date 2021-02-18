import { DxfReadonly } from './Dxf'

type Section<T extends keyof DxfReadonly> = NonNullable<DxfReadonly[T]>

const appendRecordString = (s: string, record: readonly (readonly [number, string])[]) => {
  for (const [code, value] of record) {
    s += code
    s += '\n'
    s += value
    s += '\n'
  }
  return s
}

export const createDxfFileString = (dxf: DxfReadonly) => {
  let s = ''
  for (const section in dxf) {
    s += '0\nSECTION\n2\n'
    s += section
    s += '\n'
    const sectionContents = dxf[section as keyof DxfReadonly]
    switch (section) {
      default:
        for (const record of sectionContents as Section<'ENTITIES'>) {
          s = appendRecordString(s, record)
        }
        break

      case 'HEADER':
        for (const headerName in sectionContents) {
          s += '9\n'
          s += headerName
          s += '\n'
          const groupCodeValueMap = (sectionContents as Section<'HEADER'>)[headerName]!
          for (const [code, value] of groupCodeValueMap) {
            s += code
            s += '\n'
            s += value
            s += '\n'
          }
        }
        break

      case 'CLASSES':
        for (const className in sectionContents) {
          const groupCodeValueMap = (sectionContents as Section<'CLASSES'>)[className]!
          s += '0\nCLASS\n1\n'
          s += className
          s += '\n'
          for (const [code, value] of groupCodeValueMap) {
            if (code !== 0) {
              s += code
              s += '\n'
              s += value
              s += '\n'
            }
          }
        }
        break

      case 'TABLES':
        for (const tableName in sectionContents) {
          for (const record of (sectionContents as Section<'TABLES'>)[tableName]!) {
            s = appendRecordString(s, record)
          }
          s += '0\nENDTAB\n'
        }
        break

      case 'BLOCKS':
        for (const blockName in sectionContents) {
          for (const record of (sectionContents as Section<'BLOCKS'>)[blockName]!) {
            s = appendRecordString(s, record)
          }
        }
        break

      case 'OBJECTS':
        for (const record of sectionContents as Section<'OBJECTS'>) {
          for (const [code, value] of record) {
            s += code
            s += '\n'
            s += value
            s += '\n'
          }
        }
        break

      case 'ACDSDATA':
        for (const group of sectionContents as Section<'ACDSDATA'>) {
          for (const record of group) {
            s = appendRecordString(s, record)
          }
        }
        break
    }
    s += '0\nENDSEC\n'
  }
  s += '0\nEOF\n'
  return s
}

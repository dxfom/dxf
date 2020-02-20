export interface Dxf {
  HEADER?: { [variableName in string]?: DxfRecord }
  CLASSES?: { [className in string]?: DxfRecord }
  TABLES?: { [tableName in string]?: DxfRecord[] }
  BLOCKS?: { [blockName in string]?: DxfRecord[] }
  ENTITIES?: DxfRecord[]
  OBJECTS?: DxfRecord[]
  ACDSDATA?: DxfRecord[][]
}

export interface DxfReadonly {
  readonly HEADER?: { readonly [variableName in string]?: DxfRecordReadonly }
  readonly CLASSES?: { readonly [className in string]?: DxfRecordReadonly }
  readonly TABLES?: { readonly [tableName in string]?: readonly DxfRecordReadonly[] }
  readonly BLOCKS?: { readonly [blockName in string]?: readonly DxfRecordReadonly[] }
  readonly ENTITIES?: readonly DxfRecordReadonly[]
  readonly OBJECTS?: readonly DxfRecordReadonly[]
  readonly ACDSDATA?: readonly (readonly DxfRecordReadonly[])[]
}

export type DxfRecord = [number, string][]
export type DxfRecordReadonly = readonly (readonly [number, string])[]

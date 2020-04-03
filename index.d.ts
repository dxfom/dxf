interface Dxf {
    HEADER?: {
        [variableName in string]?: DxfRecord;
    };
    CLASSES?: {
        [className in string]?: DxfRecord;
    };
    TABLES?: {
        [tableName in string]?: DxfRecord[];
    };
    BLOCKS?: {
        [blockName in string]?: DxfRecord[];
    };
    ENTITIES?: DxfRecord[];
    OBJECTS?: DxfRecord[];
    ACDSDATA?: DxfRecord[][];
}
interface DxfReadonly {
    readonly HEADER?: {
        readonly [variableName in string]?: DxfRecordReadonly;
    };
    readonly CLASSES?: {
        readonly [className in string]?: DxfRecordReadonly;
    };
    readonly TABLES?: {
        readonly [tableName in string]?: readonly DxfRecordReadonly[];
    };
    readonly BLOCKS?: {
        readonly [blockName in string]?: readonly DxfRecordReadonly[];
    };
    readonly ENTITIES?: readonly DxfRecordReadonly[];
    readonly OBJECTS?: readonly DxfRecordReadonly[];
    readonly ACDSDATA?: readonly (readonly DxfRecordReadonly[])[];
}
declare type DxfRecord = [number, string][];
declare type DxfRecordReadonly = readonly (readonly [number, string])[];

declare const parseDxfFileBlob: (dxfBlob: Blob, callback: (error: DOMException | undefined, dxf: Dxf | undefined) => void, options?: {
    readonly encoding?: string | undefined;
    readonly defaultEncoding?: string | undefined;
} | undefined) => void;

declare const parseDxfFileString: (dxfString: string) => Dxf;

declare const createDxfFileString: (dxf: DxfReadonly) => string;

declare const getGroupCodeValue: (record: DxfRecordReadonly | undefined, groupCode: number) => string | undefined;

declare const getGroupCodeValues: (record: DxfRecordReadonly | undefined, groupCode: number) => string[];

export { Dxf, DxfReadonly, DxfRecord, DxfRecordReadonly, createDxfFileString, getGroupCodeValue, getGroupCodeValues, parseDxfFileBlob, parseDxfFileString };

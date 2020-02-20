import { Dxf } from './Dxf';
export declare const parseDxfFileBlob: (dxfBlob: Blob, callback: (error: DOMException | undefined, dxf: Dxf | undefined) => void, options?: {
    readonly encoding?: string | undefined;
    readonly defaultEncoding?: string | undefined;
} | undefined) => void;

import { Dxf } from './Dxf';
export declare const parseDxfFileStringSingleSection: <S extends keyof Dxf>(dxfString: string, sectionName: S) => Dxf[S] | undefined;
export declare const parseDxfFileString: (dxfString: string) => Dxf;

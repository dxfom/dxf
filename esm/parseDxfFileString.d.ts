import { Dxf } from './Dxf';
export declare const parseDxfFileStringSingleSection: <S extends "HEADER" | "CLASSES" | "TABLES" | "BLOCKS" | "ENTITIES" | "OBJECTS" | "ACDSDATA">(dxfString: string, sectionName: S) => Dxf[S] | undefined;
export declare const parseDxfFileString: (dxfString: string) => Dxf;

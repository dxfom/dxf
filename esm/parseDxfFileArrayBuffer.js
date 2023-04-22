import { getGroupCodeValue } from './getGroupCodeValue';
import { parseDxfFileString, parseDxfFileStringSingleSection } from './parseDxfFileString';
const cpTable = {
    cp874: 'dos-874',
    cp932: 'ms932',
    cp936: 'gbk',
    cp949: 'windows-949',
    cp950: 'csbig5',
    cp1361: 'johab',
    'mac-roman': 'mac',
};
const codePageToEncoding = ($DWGCODEPAGE) => {
    const cp = $DWGCODEPAGE
        .trim()
        .toLowerCase()
        .replace(/^dos|^ansi_/, 'cp')
        .replace(/^iso8859_/, 'iso8859-');
    return cpTable[cp] || cp;
};
const defaultEncodings = {
    ja: 'ms932',
};
export const parseDxfFileArrayBuffer = (dxfArrayBuffer, options) => {
    const encoding = options?.encoding;
    const decoder = new TextDecoder(encoding ? codePageToEncoding(encoding) : undefined);
    const dxfString = decoder.decode(dxfArrayBuffer);
    if (!encoding) {
        const header = parseDxfFileStringSingleSection(dxfString, 'HEADER');
        const version = getGroupCodeValue(header?.$ACADVER, 1);
        if (!version || version < 'AC1021') {
            const encoding = getGroupCodeValue(header?.$DWGCODEPAGE, 3) ?? defaultEncodings[navigator.language] ?? 'cp1252';
            return parseDxfFileArrayBuffer(dxfArrayBuffer, { encoding });
        }
    }
    return parseDxfFileString(dxfString);
};

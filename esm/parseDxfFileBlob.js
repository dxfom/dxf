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
export const parseDxfFileBlob = (dxfBlob, callback, options) => {
    var _a;
    const encoding = (_a = options) === null || _a === void 0 ? void 0 : _a.encoding;
    const reader = new FileReader();
    reader.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        const dxfString = this.result;
        if (!encoding) {
            const header = parseDxfFileStringSingleSection(dxfString, 'HEADER');
            const version = getGroupCodeValue((_a = header) === null || _a === void 0 ? void 0 : _a.$ACADVER, 1);
            if (!version || version < 'AC1021') {
                parseDxfFileBlob(dxfBlob, callback, { encoding: (_f = (_e = (_c = getGroupCodeValue((_b = header) === null || _b === void 0 ? void 0 : _b.$DWGCODEPAGE, 3), (_c !== null && _c !== void 0 ? _c : (_d = options) === null || _d === void 0 ? void 0 : _d.defaultEncoding)), (_e !== null && _e !== void 0 ? _e : defaultEncodings[navigator.language])), (_f !== null && _f !== void 0 ? _f : 'cp1252')) });
                return;
            }
        }
        callback(undefined, parseDxfFileString(dxfString));
    };
    reader.onerror = function () {
        callback(this.error || undefined, undefined);
    };
    reader.readAsText(dxfBlob, encoding && codePageToEncoding(encoding));
};

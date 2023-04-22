const getGroupCodeValue = (record, groupCode) => {
    if (record) {
        for (const groupCodes of record) {
            if (groupCodes[0] === groupCode) {
                return groupCodes[1];
            }
        }
    }
};

const createObject = () => Object.create(null);
const dxfSectionHandler = (name, groupCodes) => {
    switch (name) {
        default: {
            const result = [];
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    result.push(currentRecord = []);
                }
                currentRecord.push(groupCode);
            }
            return result;
        }
        case 'HEADER': {
            const result = createObject();
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 9) {
                    result[groupCode[1]] = currentRecord = [];
                }
                else {
                    currentRecord.push(groupCode);
                }
            }
            return result;
        }
        case 'CLASSES': {
            const result = createObject();
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    currentRecord = [];
                }
                else if (groupCode[0] === 1) {
                    result[groupCode[1]] = currentRecord;
                }
                else {
                    currentRecord.push(groupCode);
                }
            }
            return result;
        }
        case 'TABLES': {
            const result = createObject();
            let currentTable = [];
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    currentRecord = [];
                    if (groupCode[1] === 'TABLE') {
                        currentTable = [currentRecord];
                    }
                    else if (groupCode[1] !== 'ENDTAB') {
                        currentTable.push(currentRecord);
                    }
                }
                else if (groupCode[0] === 2) {
                    if (getGroupCodeValue(currentRecord, 0) === 'TABLE') {
                        result[groupCode[1]] = currentTable;
                    }
                }
                currentRecord.push(groupCode);
            }
            return result;
        }
        case 'BLOCKS': {
            const result = createObject();
            let currentBlock = [];
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    currentRecord = [];
                    if (groupCode[1] === 'BLOCK') {
                        currentBlock = [currentRecord];
                    }
                    else {
                        currentBlock.push(currentRecord);
                    }
                }
                else if (groupCode[0] === 2) {
                    if (getGroupCodeValue(currentRecord, 0) === 'BLOCK') {
                        result[groupCode[1]] = currentBlock;
                    }
                }
                currentRecord.push(groupCode);
            }
            return result;
        }
        case 'OBJECTS': {
            const result = [];
            let currentRecord = [];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    result.push(currentRecord = []);
                }
                currentRecord.push(groupCode);
            }
            return result;
        }
        case 'ACDSDATA': {
            let currentRecord = [];
            let currentGroup = [currentRecord];
            const result = [currentGroup];
            for (const groupCode of groupCodes) {
                if (groupCode[0] === 0) {
                    result.push(currentGroup = []);
                    currentGroup.push(currentRecord = []);
                }
                else if (groupCode[0] === 2) {
                    currentGroup.push(currentRecord = []);
                }
                currentRecord.push(groupCode);
            }
            return result;
        }
    }
};
function splitDxfFileStringIntoDxfCodeValuePairs(dxfString) {
    const lines = dxfString.split(/\r\n|\r|\n/);
    const size = Math.floor(lines.length / 2);
    const codes = Array(size);
    for (let i = 0; i < size; i++) {
        codes[i] = [parseInt(lines[i + i], 10), lines[i + i + 1]];
    }
    return codes;
}
function splitDxfSections(codes) {
    const sections = [];
    for (let i = 1; i < codes.length; i++) {
        if (codes[i - 1][0] === 0 && codes[i - 1][1] === 'SECTION' && codes[i][0] === 2) {
            const sectionNameIndex = i;
            while (++i < codes.length && (codes[i][0] !== 0 || codes[i][1] !== 'ENDSEC'))
                ;
            sections.push({
                name: codes[sectionNameIndex][1],
                startIndex: sectionNameIndex + 1,
                endIndex: i,
            });
        }
    }
    return sections;
}
const parseDxfFileStringSingleSection = (dxfString, sectionName) => {
    const codes = splitDxfFileStringIntoDxfCodeValuePairs(dxfString);
    for (const { name, startIndex, endIndex } of splitDxfSections(codes)) {
        if (name === sectionName) {
            return dxfSectionHandler(name, codes.slice(startIndex, endIndex));
        }
    }
};
const parseDxfFileString = (dxfString) => {
    const result = Object.create(null);
    const codes = splitDxfFileStringIntoDxfCodeValuePairs(dxfString);
    for (const { name, startIndex, endIndex } of splitDxfSections(codes)) {
        result[name] = dxfSectionHandler(name, codes.slice(startIndex, endIndex));
    }
    return result;
};

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
const parseDxfFileArrayBuffer = (dxfArrayBuffer, options) => {
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

const appendRecordString = (s, record) => {
    for (const [code, value] of record) {
        s += code;
        s += '\n';
        s += value;
        s += '\n';
    }
    return s;
};
const createDxfFileString = (dxf) => {
    let s = '';
    for (const section in dxf) {
        s += '0\nSECTION\n2\n';
        s += section;
        s += '\n';
        const sectionContents = dxf[section];
        switch (section) {
            default:
                for (const record of sectionContents) {
                    s = appendRecordString(s, record);
                }
                break;
            case 'HEADER':
                for (const headerName in sectionContents) {
                    s += '9\n';
                    s += headerName;
                    s += '\n';
                    const groupCodeValueMap = sectionContents[headerName];
                    for (const [code, value] of groupCodeValueMap) {
                        s += code;
                        s += '\n';
                        s += value;
                        s += '\n';
                    }
                }
                break;
            case 'CLASSES':
                for (const className in sectionContents) {
                    const groupCodeValueMap = sectionContents[className];
                    s += '0\nCLASS\n1\n';
                    s += className;
                    s += '\n';
                    for (const [code, value] of groupCodeValueMap) {
                        if (code !== 0) {
                            s += code;
                            s += '\n';
                            s += value;
                            s += '\n';
                        }
                    }
                }
                break;
            case 'TABLES':
                for (const tableName in sectionContents) {
                    for (const record of sectionContents[tableName]) {
                        s = appendRecordString(s, record);
                    }
                    s += '0\nENDTAB\n';
                }
                break;
            case 'BLOCKS':
                for (const blockName in sectionContents) {
                    for (const record of sectionContents[blockName]) {
                        s = appendRecordString(s, record);
                    }
                }
                break;
            case 'OBJECTS':
                for (const record of sectionContents) {
                    for (const [code, value] of record) {
                        s += code;
                        s += '\n';
                        s += value;
                        s += '\n';
                    }
                }
                break;
            case 'ACDSDATA':
                for (const group of sectionContents) {
                    for (const record of group) {
                        s = appendRecordString(s, record);
                    }
                }
                break;
        }
        s += '0\nENDSEC\n';
    }
    s += '0\nEOF\n';
    return s;
};

const getGroupCodeValues = (record, groupCode) => {
    const values = [];
    if (record) {
        for (const groupCodes of record) {
            if (groupCodes[0] === groupCode) {
                values.push(groupCodes[1]);
            }
        }
    }
    return values;
};

export { createDxfFileString, getGroupCodeValue, getGroupCodeValues, parseDxfFileArrayBuffer, parseDxfFileString };

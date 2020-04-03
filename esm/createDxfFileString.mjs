const appendRecordString = (s, record) => {
    for (const [code, value] of record) {
        s += code;
        s += '\n';
        s += value;
        s += '\n';
    }
    return s;
};
export const createDxfFileString = (dxf) => {
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
                    const table = sectionContents[tableName];
                    for (const record of table) {
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

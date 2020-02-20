export const getGroupCodeValues = (record, groupCode) => {
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

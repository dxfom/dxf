export const getGroupCodeValue = (record, groupCode) => {
    if (record) {
        for (const groupCodes of record) {
            if (groupCodes[0] === groupCode) {
                return groupCodes[1];
            }
        }
    }
};

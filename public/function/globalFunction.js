export const subCatIdToSubCatName = (id, arr = []) => {
    let name = ""
    arr?.forEach(item => {
        if (item._id === id) {
            name = item.subCategoryName
        }
    });
    return name
}
export const filteredArray = (mainArray, removeArray) => {
    const removeIds = removeArray.map(item => item.subCategoryId);
    const filteredArray = mainArray.filter(item => !removeIds.includes(item._id));
    return filteredArray
}
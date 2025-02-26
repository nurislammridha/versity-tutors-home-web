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
export const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds.toString().padStart(2, '0')} sec ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes.toString().padStart(2, '0')} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours.toString().padStart(2, '0')} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays.toString().padStart(2, '0')} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths.toString().padStart(2, '0')} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears.toString().padStart(2, '0')} years ago`;
};

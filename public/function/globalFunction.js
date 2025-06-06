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
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Extract date components
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });

    return `${day} ${month} ${time}`;
};
export const validateNoBDPhoneNumber = (text) => {
    // Regular expression to match BD phone numbers like 01753109207
    const bdPhoneRegex = /\b01[3-9]\d{8}\b/g;

    // Check if any BD phone number exists
    if (bdPhoneRegex.test(text)) {
        return false; // Invalid - phone number found
    }
    return true; // Valid - no phone number found
}
export const convertToBanglaNumber = (number) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number?.toString().split('').map(digit =>
        banglaDigits[digit] || digit
    ).join('');
};

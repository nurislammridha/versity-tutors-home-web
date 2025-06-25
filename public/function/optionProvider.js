export const GlobalOptions = (list, name, value) => {
    let arr = [];
    if (list) {
        list.forEach((item) => {
            const obj = {
                label: item[name],
                value: item[value],
            };
            arr.push(obj);
        });
    }
    return arr;
};
export const genderOp = () => [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
]
export const religionOp = () => [
    { label: "Islam", value: "Islam" },
    { label: "Hindu", value: "Hindu" },
    { label: "Buddhu", value: "Buddhu" },
    { label: "Christian", value: "Christian" },
]
export const languageOp = () => [
    { label: "Bangla", value: "Bangla" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Hindi", value: "Hindi" },
]
export const mediumOp = () => [
    { label: "Bangla", value: "Bangla" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" }
]
export const groupOp = () => [
    { label: "Science", value: "Science" },
    { label: "Humanities", value: "Humanities" },
    { label: "Commerce", value: "Commerce" }
]
export const passingYearOp = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1999 }, (_, i) => {
        const year = currentYear - i;
        return { label: String(year), value: String(year) };
    });
};
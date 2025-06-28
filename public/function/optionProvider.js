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
export const daysPerWeekOp = () => [
    { label: "2 Day/Week", value: "2" },
    { label: "3 Day/Week", value: "3" },
    { label: "4 Day/Week", value: "4" },
    { label: "5 Day/Week", value: "5" },
    { label: "6 Day/Week", value: "6" },
    { label: "7 Day/Week", value: "7" },
]
export const daysPerMonthOp = () => [
    { label: "8 Day/Month", value: "8" },
    { label: "10 Day/Month", value: "10" },
    { label: "12 Day/Month", value: "12" },
    { label: "15 Day/Month", value: "15" },
    { label: "20 Day/Month", value: "20" },
    { label: "26 Day/Month", value: "26" },
]
export const timeDurationOp = () => [
    { label: "30 minutes", value: "30" },
    { label: "1 Hour", value: "60" },
    { label: "1.5 Hour", value: "90" },
    { label: "2 Hour", value: "120" },
]
export const timingShiftOp = () => [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" }
]
export const tuitionExperienceOp = () => [
    { label: "0 Year(s)", value: "0" },
    { label: "1 Year(s)", value: "1" },
    { label: "2 Year(s)", value: "2" },
    { label: "3 Year(s)", value: "3" },
    { label: "4 Year(s)", value: "4" },
    { label: "5 Year(s)", value: "5" },
    { label: "6 Year(s)", value: "6" },
    { label: "7 Year(s)", value: "7" },
    { label: "8 Year(s)", value: "8" },
    { label: "9 Year(s)", value: "9" },
]
export const expectedSalaryOp = () => [
    { label: "500 TK/Month", value: "500" },
    { label: "1000 TK/Month", value: "1000" },
    { label: "1500 TK/Month", value: "1500" },
    { label: "2000 TK/Month", value: "2000" },
    { label: "2500 TK/Month", value: "2500" },
    { label: "3000 TK/Month", value: "3000" },
    { label: "3500 TK/Month", value: "3500" },
    { label: "4000 TK/Month", value: "4000" },
    { label: "4500 TK/Month", value: "4500" },
    { label: "5000 TK/Month", value: "5000" },
]
export const demoClassOp = () => [
    { label: "1 Class", value: "1 Class" },
    { label: "2 Class", value: "2 Class" },
    { label: "3 Class", value: "3 Class" },
]
export const demoClassStyleOp = () => [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
]
export const demoClassPricingOp = () => [
    { label: "Free", value: "Free" },
    { label: "Paid", value: "Paid" },
]
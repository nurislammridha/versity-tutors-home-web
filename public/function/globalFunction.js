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
export const transformTuitionPayload = (payload) => {
    return payload.map(info => ({
        divisionId: info.divisionId,
        districtId: info.districtId,
        subDistrictId: info.subDistrictId,
        areaIds: (info.area || []).map(a => a.value),
        detailsAddress: info.detailsAddress,
        classId: info.classId,
        medium: info.medium,
        group: info.group,
        subjectIds: (info.subjects || []).map(s => s.value),
        daysPerWeek: info.daysPerWeek || [],
        daysPerMonth: info.daysPerMonth || [],
        timeDuration: info.timeDuration || [],
        timeShift: info.timeShift || [],
        studentGender: info.studentGender,
        tuitionExperience: info.tuitionExperience,
        tuitionExperienceLabel: info.tuitionExperienceLabel,
        expectedSalary: info.expectedSalary,
        expectedSalaryLabel: info.expectedSalaryLabel,
        isStudentHome: !!info.isStudentHome,
        isMyHome: !!info.isMyHome,
        isOnline: !!info.isOnline,
        isGroupStudy: !!info.isGroupStudy,
        isTakeDemoClass: !!info.isTakeDemoClass,
        demoClass: info.demoClass,
        demoClassStyle: info.demoClassStyle,
        demoClassPricing: info.demoClassPricing,
        //for student extra added
        instituteTypeId: info.instituteTypeId,
        instituteNameId: info.instituteNameId,
        studyTypeId: info.studyTypeId,
        departmentNameId: info.departmentNameId,
        teacherReligion: info.teacherReligion,
        expectedSalaryOnline: info.expectedSalaryOnline,
        expectedSalaryOnlineLabel: info.expectedSalaryOnlineLabel,
        expectedSalaryOffline: info.expectedSalaryOffline,
        expectedSalaryOfflineLabel: info.expectedSalaryOfflineLabel,
    }));
}
export const transformTuitionDataFromApi = (apiData) => {
    if (apiData.length === 0) {
        return [{
            division: "",
            divisionId: null,
            district: "",
            districtId: null,
            subDistrict: "",
            subDistrictId: null,
            area: [],
            detailsAddress: "",
            className: "",
            classId: null,
            medium: "",
            group: "",
            subjects: [],
            daysPerWeek: [],
            daysPerMonth: [],
            timeDuration: [],
            timeShift: [],
            studentGender: "",
            tuitionExperience: "",
            tuitionExperienceLabel: "",
            expectedSalary: "",
            expectedSalaryLabel: "",
            isStudentHome: false,
            isMyHome: false,
            isOnline: false,
            isGroupStudy: false,
            isTakeDemoClass: true,
            demoClass: "",
            demoClassStyle: "",
            demoClassPricing: "",
            //for student extra added
            instituteType: "",
            instituteTypeId: null,
            instituteName: "",
            instituteNameId: null,
            studyType: "",
            studyTypeId: null,
            departmentName: "",
            departmentNameId: null,
            teacherReligion: "",
            expectedSalaryOnline: "",
            expectedSalaryOnlineLabel: "",
            expectedSalaryOffline: "",
            expectedSalaryOfflineLabel: "",
        }]
    }
    return apiData.map(item => ({
        division: item.divisionId?.divisionName || "",
        divisionId: item.divisionId?._id || null,
        district: item.districtId?.districtName || "",
        districtId: item.districtId?._id || null,
        subDistrict: item.subDistrictId?.subDistrictName || "",
        subDistrictId: item.subDistrictId?._id || null,
        area: (item.areaIds || []).map(area => ({
            label: area.areaName,
            value: area._id
        })),
        detailsAddress: item.detailsAddress || "",
        className: item.classId?.categoryName || "",
        classId: item.classId?._id || null,
        medium: item.medium || "",
        group: item.group || "",
        subjects: (item.subjectIds || []).map(subject => ({
            label: subject.subCategoryName,
            value: subject._id
        })),
        daysPerWeek: (item.daysPerWeek || []).map(day => ({
            label: day.label,
            value: day.value
        })),
        daysPerMonth: (item.daysPerMonth || []).map(day => ({
            label: day.label,
            value: day.value
        })),
        timeDuration: (item.timeDuration || []).map(duration => ({
            label: duration.label,
            value: duration.value
        })),
        timeShift: (item.timeShift || []).map(shift => ({
            label: shift.label,
            value: shift.value
        })),
        studentGender: item.studentGender || "",
        tuitionExperience: item.tuitionExperience || "",
        tuitionExperienceLabel: item.tuitionExperienceLabel || "",
        expectedSalary: item.expectedSalary || "",
        expectedSalaryLabel: item.expectedSalaryLabel || "",
        isStudentHome: !!item.isStudentHome,
        isMyHome: !!item.isMyHome,
        isOnline: !!item.isOnline,
        isGroupStudy: !!item.isGroupStudy,
        isTakeDemoClass: !!item.isTakeDemoClass,
        demoClass: item.demoClass || "",
        demoClassStyle: item.demoClassStyle || "",
        demoClassPricing: item.demoClassPricing || "",
        //for student extra added
        instituteType: item?.instituteTypeId?.instituteType || "",
        instituteTypeId: item?.instituteTypeId?._id || null,
        instituteName: item?.instituteNameId?.instituteName || "",
        instituteNameId: item?.instituteNameId?._id || null,
        studyType: item?.studyTypeId?.studyType || "",
        studyTypeId: item?.studyTypeId?._id || null,
        departmentName: item?.departmentNameId?.departmentName || "",
        departmentNameId: item?.departmentNameId?._id || null,
        teacherReligion: item?.teacherReligion || "",
        expectedSalaryOnline: item?.expectedSalaryOnline || "",
        expectedSalaryOnlineLabel: item?.expectedSalaryOnlineLabel || "",
        expectedSalaryOffline: item?.expectedSalaryOffline || "",
        expectedSalaryOfflineLabel: item?.expectedSalaryOfflineLabel || "",
    }));
}
export const mapApiDataToLocalObject = (apiData) => {
    // Mapping titles from API to local object keys
    const titleToKeyMap = {
        nid: "nid",
        ssc: "sscCert",
        hsc: "hscCert",
        bachelor: "aLevelCert",
        slip: "paymentSlip",
    };

    // Initial local object
    const localObject = {
        nid: { progress: 0, isUploading: false, image: null, docInfo: "" },
        hscCert: { progress: 0, isUploading: false, image: null, docInfo: "" },
        sscCert: { progress: 0, isUploading: false, image: null, docInfo: "" },
        aLevelCert: { progress: 0, isUploading: false, image: null, docInfo: "" },
        paymentSlip: { progress: 0, isUploading: false, image: null, docInfo: "" },
    };

    // Apply API data to local object
    apiData.forEach((item) => {
        const key = titleToKeyMap[item.title.toLowerCase()];
        if (key && localObject.hasOwnProperty(key)) {
            localObject[key].image = item.doc;
            localObject[key].docInfo = item;
        }
    });

    return localObject;
};

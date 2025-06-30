import { useLanguage } from '@/context/LanguageContext'
import { AddTuitionTab, AreaBySubDistrictId, DepartmentNameByStudyTypeId, DistrictByDivisionId, FalseUpdated, GetCategoryList, GetDivisionList, GetInstituteTypeList, GetPersonalInput, GetStudyTypeList, GetSubCategoryByCategoryId, GetTuitionInput, InstituteNameByInstituteTypeId, PersonalSubmit, SetPersonalData, SetTuitionData, SubDistrictByDistrictId, TuitionSubmit } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { daysPerMonthOp, daysPerWeekOp, demoClassOp, demoClassPricingOp, demoClassStyleOp, expectedSalaryOp, genderOp, GlobalOptions, groupOp, mediumOp, religionOp, studentGenderOp, timeDurationOp, timingShiftOp, tuitionExperienceOp } from '../../public/function/optionProvider'

const MAX_TABS = 5;
const StudentTuitionInfo = ({ clientData, setActiveState }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [isPreviousLocation, sePreviousLocation] = useState(false);

    const { falseUpdated, isPersonalLoading, tuitionInfos, divisionList, districtList, subDistrictList, areaList, categoryList,
        subCategoryList, instituteTypeList, bachelorInstituteNameList, studyTypeList, bachelorDepartmentNameList,
    } = useSelector((state) => state.homeInfo);
    const { division, divisionId, district, districtId, subDistrict, subDistrictId, area,
        areaId, detailsAddress, className, classId, medium, group, subjects, daysPerWeek,
        daysPerMonth, timeDuration, timeShift, studentGender, tuitionExperience,
        tuitionExperienceLabel, expectedSalary, expectedSalaryLabel, isStudentHome,
        isMyHome, isOnline, isGroupStudy, demoClass, demoClassStyle, demoClassPricing,
        isTakeDemoClass, instituteType, instituteTypeId, instituteName, instituteNameId, studyType, studyTypeId,
        departmentName, departmentNameId, teacherReligion, expectedSalaryOnline, expectedSalaryOnlineLabel, expectedSalaryOffline,
        expectedSalaryOfflineLabel } = tuitionInfos[activeTabIndex] || {};

    const handleInput = (index, name, value) => {
        dispatch(GetTuitionInput(index, name, value));
    };

    const handleTabClick = (index) => {
        // Don't allow clicking beyond the next tab
        if (index > tuitionInfos.length) return;

        // If clicked on the next white tab, add a new info item
        if (index === tuitionInfos.length && tuitionInfos.length < MAX_TABS) {
            // const newInfos = [...infos, { name: "" }];
            // setInfos(newInfos);
            dispatch(AddTuitionTab(index))
        }

        setActiveTabIndex(index);
    };
    const handleSubmit = () => {
        dispatch(TuitionSubmit(tuitionInfos, clientData._id))
    }
    useEffect(() => {
        dispatch(GetDivisionList());
        dispatch(GetCategoryList());
        dispatch(GetInstituteTypeList());
        dispatch(GetStudyTypeList());
    }, []);
    useEffect(() => {
        setActiveTabIndex(tuitionInfos.length - 1)
    }, [tuitionInfos])

    useEffect(() => {
        if (clientData) dispatch(SetTuitionData(clientData?.tuitionInfos || []));
    }, [clientData]);

    useEffect(() => {
        if (instituteTypeId?.length > 0) dispatch(InstituteNameByInstituteTypeId(instituteTypeId));
        if (studyTypeId?.length > 0) dispatch(DepartmentNameByStudyTypeId(studyTypeId));
        if (classId?.length > 0) dispatch(GetSubCategoryByCategoryId(classId));
    }, [classId, studyTypeId, instituteTypeId]);

    useEffect(() => {
        if (falseUpdated) {
            dispatch(FalseUpdated())
            // setActiveState("document")
        }
    }, [falseUpdated])
    console.log('tuitionInfos', tuitionInfos)
    return (
        <>

            {/* tuition info tabs */}
            <div className="tuition-tabs-container px-3 py-2">
                <div className="tuition-tabs d-flex gap-3 overflow-auto flex-nowrap">
                    {[...Array(MAX_TABS)].map((_, index) => {
                        let className = "tab-btn";
                        if (index === activeTabIndex) {
                            className += " active";
                        } else if (index < tuitionInfos.length) {
                            className += " added";
                        } else if (index === tuitionInfos.length) {
                            className += " white";
                        } else {
                            className += " dim";
                        }

                        const label =
                            index < tuitionInfos.length
                                ? `Tuition Info ${index + 1}`
                                : `Add Tuition ${index + 1}`;

                        return (
                            <button
                                key={index}
                                className={className}
                                onClick={() => handleTabClick(index)}
                                disabled={index > tuitionInfos.length}
                            >
                                {index < tuitionInfos.length ? (
                                    <i class="fas fa-check me-1"></i>
                                ) : (
                                    <i class="fas fa-plus me-1"></i>
                                )}
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
            {/* preferred tuition location */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>Your Expected tutor</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">

                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Institute Type"}</label>
                                                <Select
                                                    options={GlobalOptions(instituteTypeList, "instituteType", "_id")}
                                                    value={instituteType ? { label: instituteType, value: instituteTypeId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select institute type"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "instituteType", e.label)
                                                        handleInput(activeTabIndex, "instituteTypeId", e.value)
                                                        handleInput(activeTabIndex, "instituteName", "")
                                                        handleInput(activeTabIndex, "instituteNameId", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Institute Name"}</label>
                                                <Select
                                                    options={GlobalOptions(bachelorInstituteNameList, "instituteName", "_id")}
                                                    value={instituteName ? { label: instituteName, value: instituteNameId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select institute name"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "instituteName", e.label)
                                                        handleInput(activeTabIndex, "instituteNameId", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Study Type"}</label>
                                                <Select
                                                    options={GlobalOptions(studyTypeList, "studyType", "_id")}
                                                    value={studyType ? { label: studyType, value: studyTypeId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select study type"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "studyType", e.label)
                                                        handleInput(activeTabIndex, "studyTypeId", e.value)
                                                        handleInput(activeTabIndex, "departmentName", "")
                                                        handleInput(activeTabIndex, "departmentNameId", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Department"}</label>
                                                <Select
                                                    options={GlobalOptions(bachelorDepartmentNameList, "departmentName", "_id")}
                                                    value={departmentName ? { label: departmentName, value: departmentNameId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select department"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "departmentName", e.label)
                                                        handleInput(activeTabIndex, "departmentNameId", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Teacher gender"}</label>
                                                <Select
                                                    options={studentGenderOp()}
                                                    value={studentGender ? { label: studentGender, value: studentGender } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select teacher gender"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "studentGender", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Teacher Religion"}</label>
                                                <Select
                                                    options={religionOp()}
                                                    value={teacherReligion ? { label: teacherReligion, value: teacherReligion } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select teacher religion"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "teacherReligion", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            {/* type of tuition */}
            {/* type of tuition */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>Type of Tuition</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Class"}</label>
                                                <Select
                                                    options={GlobalOptions(categoryList, "categoryName", "_id")}
                                                    value={className ? { label: className, value: classId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select class name"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "className", e.label)
                                                        handleInput(activeTabIndex, "classId", e.value)
                                                        handleInput(activeTabIndex, "subjects", [])
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Medium"}</label>
                                                <Select
                                                    options={mediumOp()}
                                                    value={medium ? { label: medium, value: medium } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select medium"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "medium", e.label)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Group"}</label>
                                                <Select
                                                    options={groupOp()}
                                                    value={group ? { label: group, value: group } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "group", e.label)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Subjects(1st one will be major sub)"}</label>
                                                <Select
                                                    options={GlobalOptions(subCategoryList, "subCategoryName", "_id")}
                                                    value={subjects}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select subjects"
                                                    isMulti
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "subjects", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Days Per Week"}</label>
                                                <Select
                                                    options={daysPerWeekOp()}
                                                    value={daysPerWeek}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select days per week"
                                                    isMulti
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "daysPerWeek", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Days Per Month"}</label>
                                                <Select
                                                    options={daysPerMonthOp()}
                                                    value={daysPerMonth}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select days per month"
                                                    isMulti
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "daysPerMonth", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Time Duration"}</label>
                                                <Select
                                                    options={timeDurationOp()}
                                                    value={timeDuration}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    isMulti
                                                    placeholder="Select time duration"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "timeDuration", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Time Shift"}</label>
                                                <Select
                                                    options={timingShiftOp()}
                                                    value={timeShift}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select time shift"
                                                    isMulti
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "timeShift", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Tuition Experience (In Year)"}</label>
                                                <Select
                                                    options={tuitionExperienceOp()}
                                                    value={tuitionExperience ? { label: tuitionExperienceLabel, value: tuitionExperience } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select tuition experience"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "tuitionExperienceLabel", e.label)
                                                        handleInput(activeTabIndex, "tuitionExperience", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Expected Salary(Offline)"}</label>
                                                <Select
                                                    options={expectedSalaryOp()}
                                                    value={expectedSalaryOffline ? { label: expectedSalaryOfflineLabel, value: expectedSalaryOffline } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select expected salary"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "expectedSalaryOfflineLabel", e.label)
                                                        handleInput(activeTabIndex, "expectedSalaryOffline", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Expected Salary(Online)"}</label>
                                                <Select
                                                    options={expectedSalaryOp()}
                                                    value={expectedSalaryOnline ? { label: expectedSalaryOnlineLabel, value: expectedSalaryOnline } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select expected salary"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "expectedSalaryOnlineLabel", e.label)
                                                        handleInput(activeTabIndex, "expectedSalaryOnline", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="tu-label">Tutoring Style</label>
                                                <ul className="tu-status-filter tutoring-style">
                                                    <li>
                                                        <div className="tu-status-contnent">
                                                            <div className="tu-check tu-checksm">
                                                                <input
                                                                    type="checkbox"
                                                                    id="home"
                                                                    name="expcheck"
                                                                    checked={isStudentHome}
                                                                    onChange={() => handleInput(activeTabIndex, "isStudentHome", !isStudentHome)}
                                                                />
                                                                <label for="home">{"Students home"}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="tu-status-contnent">
                                                            <div className="tu-check tu-checksm">
                                                                <input
                                                                    type="checkbox"
                                                                    id="home1"
                                                                    name="expcheck"
                                                                    checked={isMyHome}
                                                                    onChange={() => handleInput(activeTabIndex, "isMyHome", !isMyHome)}
                                                                />
                                                                <label for="home1">My home</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="tu-status-contnent">
                                                            <div className="tu-check tu-checksm">
                                                                <input
                                                                    type="checkbox"
                                                                    id="online"
                                                                    name="expcheck"
                                                                    checked={isOnline}
                                                                    onChange={() => handleInput(activeTabIndex, "isOnline", !isOnline)}
                                                                />
                                                                <label for="online">{t.online}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="tu-status-contnent">
                                                            <div className="tu-check tu-checksm">
                                                                <input
                                                                    type="checkbox"
                                                                    id="group"
                                                                    name="expcheck"
                                                                    checked={isGroupStudy}
                                                                    onChange={() => handleInput(activeTabIndex, "isGroupStudy", !isGroupStudy)}
                                                                />
                                                                <label for="group">Group Study</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>


                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            {/* should you take a demo class */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4 className="d-flex align-items-center gap-2">
                                    Should you get a demo class?
                                    <label htmlFor="demo-check" className="demo-check-label" style={{ marginBottom: "0px" }}>
                                        <input
                                            type="checkbox"
                                            id="demo-check"
                                            className="demo-check"
                                            checked={isTakeDemoClass}
                                            onChange={() => handleInput(activeTabIndex, "isTakeDemoClass", !isTakeDemoClass)}
                                        />
                                        <span className="custom-checkmark"></span>
                                    </label>
                                </h4>

                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Demo Class(Optional)"}</label>
                                                <Select
                                                    options={demoClassOp()}
                                                    value={demoClass ? { label: demoClass, value: demoClass } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select demo class"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "demoClass", e.label)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Demo Class Style"}</label>
                                                <Select
                                                    options={demoClassStyleOp()}
                                                    value={demoClassStyle ? { label: demoClassStyle, value: demoClassStyle } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select demo class style"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "demoClassStyle", e.label)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Demo Class Pricing"}</label>
                                                <Select
                                                    options={demoClassPricingOp()}
                                                    value={demoClassPricing ? { label: demoClassPricing, value: demoClassPricing } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select demo class pri.."
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "demoClassPricing", e.label)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="tu-btnarea-two">
                    <a

                        className="tu-primbtn-lg my-previous-btn"
                        onClick={() => setActiveState("personal")}
                    >
                        <i class="fa-solid fa-arrow-left"></i>
                        {"Previous"}

                    </a>
                    <a

                        className="tu-primbtn-lg my-btn"
                        onClick={() => !isPersonalLoading && handleSubmit()}
                    >
                        {"Save & Update"}
                        {isPersonalLoading ?
                            <div class="spinner-border spinner-border-sm ms-2"></div> :
                            <i class="fa-solid fa-arrow-right"></i>
                        }
                    </a>

                </div>
            </div>

        </>
    )
}

export default StudentTuitionInfo
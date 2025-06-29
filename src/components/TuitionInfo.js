import { useLanguage } from '@/context/LanguageContext'
import { AddTuitionTab, AreaBySubDistrictId, DistrictByDivisionId, FalseUpdated, GetCategoryList, GetDivisionList, GetPersonalInput, GetSubCategoryByCategoryId, GetTuitionInput, PersonalSubmit, SetPersonalData, SetTuitionData, SubDistrictByDistrictId, TuitionSubmit } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { daysPerMonthOp, daysPerWeekOp, demoClassOp, demoClassPricingOp, demoClassStyleOp, expectedSalaryOp, genderOp, GlobalOptions, groupOp, mediumOp, timeDurationOp, timingShiftOp, tuitionExperienceOp } from '../../public/function/optionProvider'
const totalTabs = 5;
const MAX_TABS = 5;
const TuitionInfo = ({ clientData, setActiveState }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [isPreviousLocation, sePreviousLocation] = useState(false);

    const { falseUpdated, isPersonalLoading, tuitionInfos, divisionList, districtList, subDistrictList, areaList, categoryList, subCategoryList } = useSelector((state) => state.homeInfo);
    const { division, divisionId, district, districtId, subDistrict, subDistrictId, area,
        areaId, detailsAddress, className, classId, medium, group, subjects, daysPerWeek,
        daysPerMonth, timeDuration, timeShift, studentGender, tuitionExperience,
        tuitionExperienceLabel, expectedSalary, expectedSalaryLabel, isStudentHome,
        isMyHome, isOnline, isGroupStudy, demoClass, demoClassStyle, demoClassPricing,
        isTakeDemoClass } = tuitionInfos[activeTabIndex] || {};

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
    }, []);
    useEffect(() => {
        setActiveTabIndex(tuitionInfos.length - 1)
    }, [tuitionInfos])

    useEffect(() => {
        if (clientData) dispatch(SetTuitionData(clientData?.tuitionInfos));
    }, [clientData]);

    useEffect(() => {
        if (divisionId?.length > 0) dispatch(DistrictByDivisionId(divisionId));
        if (districtId?.length > 0) dispatch(SubDistrictByDistrictId(districtId));
        if (subDistrictId?.length > 0) dispatch(AreaBySubDistrictId(subDistrictId));
        if (classId?.length > 0) dispatch(GetSubCategoryByCategoryId(classId));
    }, [divisionId, districtId, subDistrictId, classId]);
    useEffect(() => {
        if (falseUpdated) {
            dispatch(FalseUpdated())
            setActiveState("document")
        }
    }, [falseUpdated])
    useEffect(() => {
        if (isPreviousLocation) {
            const { division, divisionId, district, districtId, subDistrict, subDistrictId, area,
                areaId, detailsAddress } = tuitionInfos[activeTabIndex - 1] || {};

            handleInput(activeTabIndex, "division", division)
            handleInput(activeTabIndex, "divisionId", divisionId)
            handleInput(activeTabIndex, "district", district)
            handleInput(activeTabIndex, "districtId", districtId)
            handleInput(activeTabIndex, "subDistrict", subDistrict)
            handleInput(activeTabIndex, "subDistrictId", subDistrictId)
            handleInput(activeTabIndex, "area", area)
            handleInput(activeTabIndex, "detailsAddress", detailsAddress)

        }


    }, [isPreviousLocation])

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
            {activeTabIndex !== 0 && <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4 className="d-flex align-items-center gap-2">
                                    Are you using the previous location?
                                    <label htmlFor="demo-check" className="demo-check-label" style={{ marginBottom: "0px" }}>
                                        <input
                                            type="checkbox"
                                            id="demo-check"
                                            className="demo-check"
                                            checked={isPreviousLocation}
                                            onChange={() => sePreviousLocation(!isPreviousLocation)}
                                        />
                                        <span className="custom-checkmark"></span>
                                    </label>
                                </h4>

                            </div>
                        </div>

                    </div>
                </div>

            </div>}
            {/* preferred tuition location */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>Preferred Tuition Location</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Division"}</label>
                                                <Select
                                                    options={GlobalOptions(divisionList, "divisionName", "_id")}
                                                    value={division ? { label: division, value: divisionId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select division"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "division", e.label)
                                                        handleInput(activeTabIndex, "divisionId", e.value)
                                                        handleInput(activeTabIndex, "district", "")
                                                        handleInput(activeTabIndex, "area", [])
                                                        handleInput(activeTabIndex, "subDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"District"}</label>
                                                <Select
                                                    options={GlobalOptions(districtList, "districtName", "_id")}
                                                    value={district ? { label: district, value: districtId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select district"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "district", e.label)
                                                        handleInput(activeTabIndex, "districtId", e.value)
                                                        handleInput(activeTabIndex, "area", [])
                                                        handleInput(activeTabIndex, "subDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Sub-district"}</label>
                                                <Select
                                                    options={GlobalOptions(subDistrictList, "subDistrictName", "_id")}
                                                    value={subDistrict ? { label: subDistrict, value: subDistrictId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select sub district"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "subDistrict", e.label)
                                                        handleInput(activeTabIndex, "subDistrictId", e.value)
                                                        handleInput(activeTabIndex, "area", [])
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Tuition Area"}</label>
                                                <Select
                                                    options={GlobalOptions(areaList, "areaName", "_id")}
                                                    value={area}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select area"
                                                    isMulti
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "area", e)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Details Address"}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your first name"
                                                        value={detailsAddress}
                                                        onChange={(e) => handleInput(activeTabIndex, "detailsAddress", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Write address"}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
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
                                                <label className="tu-label">{"Student Gender"}</label>
                                                <Select
                                                    options={genderOp()}
                                                    value={studentGender ? { label: studentGender, value: studentGender } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select student gender"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "studentGender", e.value)
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
                                                <label className="tu-label">{"Expected Salary"}</label>
                                                <Select
                                                    options={expectedSalaryOp()}
                                                    value={expectedSalary ? { label: expectedSalaryLabel, value: expectedSalary } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select expected salary"
                                                    onChange={(e) => {
                                                        handleInput(activeTabIndex, "expectedSalaryLabel", e.label)
                                                        handleInput(activeTabIndex, "expectedSalary", e.value)
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
                                    Should you take a demo class?
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
                        onClick={() => setActiveState("educational")}
                    >
                        <i class="fa-solid fa-arrow-left"></i>
                        {"Previous"}

                    </a>
                    <a

                        className="tu-primbtn-lg my-btn"
                        onClick={() => !isPersonalLoading && handleSubmit()}
                    >
                        {"Next"}
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

export default TuitionInfo
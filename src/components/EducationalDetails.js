import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetEducationInput, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'
import Select from "react-select";
import { groupOp, mediumOp, passingYearOp } from '../../public/function/optionProvider'

const EducationalDetails = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const { education, isEducationLoading } = useSelector((state) => state.homeInfo);
    const { sscInstituteName, sscMedium, sscGroup, sscSession, sscPassingYear,
        sscResult, hscInstituteName, hscMedium, hscGroup, hscSession, hscPassingYear,
        hscResult, bachelorInstituteType, bachelorInstituteTypeId, bachelorInstituteName,
        bachelorInstituteNameId, bachelorStudyType, bachelorStudyTypeId, bachelorDepartment,
        bachelorDepartmentId, bachelorMedium, bachelorSession, bachelorPassingYear, bachelorCgpa,
        postInstituteType, postInstituteTypeId, postInstituteName, postInstituteNameId,
        postStudyType, postStudyTypeId, postDepartment, postDepartmentId, postMedium, postSession,
        postPassingYear, postCgpa } = education;


    const { isTutorAccount } = clientData || {}
    const handleInput = (name, value) => {
        dispatch(GetEducationInput(name, value))
    }
    const handleSubmit = () => {
        // dispatch(PersonalSubmit(personal, clientData._id))
    }
    useEffect(() => {
        // dispatch(GetDivisionList());
    }, []);
    useEffect(() => {
        clientData !== null && dispatch(SetPersonalData(clientData));
    }, [clientData]);


    return (
        <>
            {/* ssc olevel dakhil */}
            <div className="tu-profilewrapper">
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>SSC / O-level / Dakhil</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Name"}<em className='color-red'>*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Enter institute name"
                                                        value={sscInstituteName}
                                                        onChange={(e) => handleInput("sscInstituteName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Your institute name"}</span>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="form-group form-group-half">
                                                <label className="tu-label">Medium<em className="color-red">*</em></label>
                                                <Select
                                                    options={mediumOp()}
                                                    value={sscMedium ? { label: sscMedium, value: sscMedium } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select medium"
                                                    onChange={(e) => handleInput("sscMedium", e.value)}
                                                />
                                            </div>


                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Group"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={groupOp()}
                                                    value={sscGroup ? { label: sscGroup, value: sscGroup } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    onChange={(e) => handleInput("sscGroup", e.value)}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Session"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        // required=""
                                                        placeholder="Your first name"
                                                        value={sscSession}
                                                        onChange={(e) => handleInput("sscSession", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Write session"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Passing Year"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={passingYearOp()}
                                                    value={sscPassingYear ? { label: sscPassingYear, value: sscPassingYear } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select passing year"
                                                    onChange={(e) => handleInput("sscPassingYear", e.value)}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Result"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your first name"
                                                        value={sscResult}
                                                        onChange={(e) => handleInput("sscResult", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"ex: 5:00"}</span>
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
            {/* HSC a level alim */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>HSC / A level / Alim</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Name"}<em className='color-red'>*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Enter institute name"
                                                        value={hscInstituteName}
                                                        onChange={(e) => handleInput("hscInstituteName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Your institute name"}</span>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="form-group form-group-half">
                                                <label className="tu-label">Medium<em className="color-red">*</em></label>
                                                <Select
                                                    options={mediumOp()}
                                                    value={hscMedium ? { label: hscMedium, value: hscMedium } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select medium"
                                                    onChange={(e) => handleInput("hscMedium", e.value)}
                                                />
                                            </div>


                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Group"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={groupOp()}
                                                    value={hscGroup ? { label: hscGroup, value: hscGroup } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    onChange={(e) => handleInput("hscGroup", e.value)}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Session"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        // required=""
                                                        placeholder="Your first name"
                                                        value={hscSession}
                                                        onChange={(e) => handleInput("hscSession", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Write session"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Passing Year"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={passingYearOp()}
                                                    value={hscPassingYear ? { label: hscPassingYear, value: hscPassingYear } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select passing year"
                                                    onChange={(e) => handleInput("hscPassingYear", e.value)}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Result"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your first name"
                                                        value={hscResult}
                                                        onChange={(e) => handleInput("hscResult", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"ex: 5:00"}</span>
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
            {/* Bachelor / Diploma */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>Bachelor / Diploma</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Type"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={groupOp()}
                                                    value={sscGroup ? { label: sscGroup, value: sscGroup } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select institute type"
                                                    onChange={(e) => handleInput("sscGroup", e.value)}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Name"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Study Type"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Department"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Medium"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Session"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your first name"
                                                        //value={firstName}
                                                        onChange={(e) => handleInput("firstName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Write session"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Passing Year"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"CGPA / Current CGPA"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your first name"
                                                        //value={firstName}
                                                        onChange={(e) => handleInput("firstName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"ex: 4:00"}</span>
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
            {/* post graduation */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>Post Graduation</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Type"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select institute type", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-full">
                                                <label className="tu-label">{"Institute Name"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Study Type"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>

                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Department"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Medium"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Session"}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your first name"
                                                        //value={firstName}
                                                        onChange={(e) => handleInput("firstName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Write session"}</span>
                                                        <em>*</em>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Passing Year"}</label>
                                                <Select
                                                    options={[
                                                        { label: "Select medium", value: "Select medium" },
                                                        { label: "Another option", value: "another" },
                                                    ]}
                                                    value={{ label: "Select passing year", value: "" }}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"CGPA / Current CGPA"}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your first name"
                                                        //value={firstName}
                                                        onChange={(e) => handleInput("firstName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"ex: 4:00"}</span>
                                                        <em>*</em>
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
                <div className="tu-btnarea-two">
                    <a

                        className="tu-primbtn-lg my-previous-btn"
                        onClick={() => !isPersonalLoading && handleSubmit()}
                    >
                        <i class="fa-solid fa-arrow-left"></i>
                        {"Previous"}

                    </a>
                    <a

                        className="tu-primbtn-lg my-btn"
                        onClick={() => !isPersonalLoading && handleSubmit()}
                    >
                        {"Next"}
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>
            </div>
        </>
    )
}

export default EducationalDetails
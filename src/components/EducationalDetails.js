import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'
import Select from "react-select";

const EducationalDetails = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const personal = useSelector((state) => state.homeInfo.personal);
    const divisionList = useSelector((state) => state.homeInfo.divisionList);
    const districtList = useSelector((state) => state.homeInfo.districtList);
    const subDistrictList = useSelector((state) => state.homeInfo.subDistrictList);
    const areaList = useSelector((state) => state.homeInfo.areaList);
    const isPersonalLoading = useSelector((state) => state.homeInfo.isPersonalLoading);
    const { firstName, lastName, tagline, hourlyFee, divisionId, divisionInfo, districtId, districtInfo, subDistrictId, subDistrictInfo, areaId, areaInfo, zipCode, tutorBriefIntroduction,
        isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address, gender } = personal
    const { isTutorAccount } = clientData || {}
    const handleInput = (name, value) => {
        console.log('name,value', name, value)
        dispatch(GetPersonalInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(PersonalSubmit(personal, clientData._id))
    }
    useEffect(() => {
        // dispatch(GetClientById());
        dispatch(GetDivisionList());
    }, []);
    useEffect(() => {
        clientData !== null && dispatch(SetPersonalData(clientData));
    }, [clientData]);

    useEffect(() => {
        divisionId?.length > 0 && dispatch(DistrictByDivisionId(divisionId));
    }, [divisionId]);
    useEffect(() => {
        districtId?.length > 0 && dispatch(SubDistrictByDistrictId(districtId));
    }, [districtId]);
    useEffect(() => {
        subDistrictId?.length > 0 && dispatch(AreaBySubDistrictId(subDistrictId));
    }, [subDistrictId]);
    console.log('personal', personal)
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div class="mb24 mo-tab">
                    <div class="d-flex flex-wrap justify-content-between tab-row">
                        <div class="tab-col">
                            <div class="tab-card active">
                                <div className='mo-card'>
                                    <img src="images/award.png" alt="Personal Info" />
                                </div>

                                <div class="tab-label">Personal Info</div>
                            </div>
                        </div>
                        <div class="tab-col">
                            <div class="tab-card">
                                <div className='mo-card'>
                                    <img src="images/man.png" alt="Educational Info" />
                                </div>

                                <div class="tab-label">Educational Info</div>
                            </div>
                        </div>
                        <div class="tab-col">
                            <div class="tab-card">
                                <div className='mo-card'>
                                    <img src="images/card.png" alt="Tuition Info" />
                                </div>

                                <div class="tab-label">Tuition Info</div>
                            </div>
                        </div>
                        <div class="tab-col">
                            <div class="tab-card">
                                <div className='mo-card'>
                                    <img src="images/upload.png" alt="Document Info" />
                                </div>

                                <div class="tab-label">Document Info</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                    <label className="tu-label">{"Institute Name"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Your institute name"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Medium<em className="color-red"></em></label>
                                                    <Select
                                                        options={[{ label: "Select medium", value: "Select medium" }]}
                                                        value={{ label: "Select medium", value: "Select medium" }}
                                                        classNamePrefix="react-select"
                                                        className="w-100"
                                                        placeholder="Select medium"
                                                    />
                                                </div>


                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{"Group"}</label>
                                                    <Select
                                                        options={[{ label: "Select medium", value: "Select medium" }]}
                                                        value={{ label: "Select group", value: "" }}
                                                        classNamePrefix="react-select"
                                                        className="w-100"
                                                        placeholder="Select group"
                                                    />
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Session"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Write session"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
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
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Result"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"ex: 5:00"}</span>
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
                                                    <label className="tu-label">{"Institute Name"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Your institute name"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
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
                                                    <label className="tu-label">{"Group"}</label>
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
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Session"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Write session"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
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
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Result"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your first name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"ex: 5:00"}</span>
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
                                                    <label className="tu-label">{"Institute Type"}</label>
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
                                                            value={firstName}
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
                                                            value={firstName}
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
                                                            value={firstName}
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
                                                            value={firstName}
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

            </div>
        </>
    )
}

export default EducationalDetails
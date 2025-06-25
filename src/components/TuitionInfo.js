import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'

const TuitionInfo = ({ clientData }) => {
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
            {/* tuition info tabs */}
            <div class="tuition-tabs-container px-3 py-2">
                <div class="tuition-tabs d-flex gap-3 overflow-auto flex-nowrap">
                    <button class="tab-btn active">Tuition Info 1</button>
                    <button class="tab-btn white">+ Add Tuition 2</button>
                    <button class="tab-btn dim">+ Add Tuition 3</button>
                    <button class="tab-btn dim">+ Add Tuition 4</button>
                    <button class="tab-btn dim">+ Add Tuition 5</button>
                    {/* <button class="tab-btn dim">+ Add Tuition 5</button>
                        <button class="tab-btn dim">+ Add Tuition 5</button> */}

                </div>
            </div>

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
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select division"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"District"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select district"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Sub-district"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select sub district"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Tuition Area"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select tuition area"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Details Address"}</label>
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
                                                        <span>{"Write address"}</span>
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
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select class"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Medium"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select medium"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Group"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select group"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Subjects(1st one will be major sub)"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select subjects"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Days Per Week"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select days per week"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Days Per Month"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select days per month"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Time Duration"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select time duration"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Time Shift"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select time shift"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Student Gender"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select .."}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Tuition Experience (In Year)"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select .."}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Expected Salary"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select .."}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
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
                                                                    checked={isTeachingLocationTutorHome}
                                                                    onChange={() => handleInput("isTeachingLocationTutorHome", !isTeachingLocationTutorHome)}
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
                                                                    checked={isTeachingLocationStudentHome}
                                                                    onChange={() => handleInput("isTeachingLocationStudentHome", !isTeachingLocationStudentHome)}
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
                                                                    checked={isTeachingLocationOnline}
                                                                    onChange={() => handleInput("isTeachingLocationOnline", !isTeachingLocationOnline)}
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
                                                                    id="online"
                                                                    name="expcheck"
                                                                    checked={isTeachingLocationOnline}
                                                                    onChange={() => handleInput("isTeachingLocationOnline", !isTeachingLocationOnline)}
                                                                />
                                                                <label for="online">Group Study</label>
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
                                            defaultChecked
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
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"How many class"}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Demo Class Style"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select..."}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Demo Class Pricing"}</label>
                                                <div className="tu-select">
                                                    <select
                                                        data-placeholder="Select Gender"
                                                        data-placeholderinput="Select Gender"
                                                        className="form-control"
                                                        required
                                                        value={divisionId}
                                                        onChange={(e) => {
                                                            handleInput("divisionId", e.target.value)
                                                            handleInput("divisionInfo", e.target.value)
                                                        }}
                                                    >
                                                        <option label={"Select..."}></option>
                                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                            <option key={index} value={item._id}>{item.divisionName}</option>
                                                        ))}
                                                    </select>
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

export default TuitionInfo
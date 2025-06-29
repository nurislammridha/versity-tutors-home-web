import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, FalseUpdated, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'
import Select from 'react-select'
import { genderOp, GlobalOptions, languageOp, religionOp } from '../../public/function/optionProvider'
const PersonalDetails = ({ clientData, setActiveState }) => {
    const { t, language: lan } = useLanguage()
    const dispatch = useDispatch()
    const {
        personal,
        divisionList,
        districtList,
        subDistrictList,
        areaList,
        permanentDistrictList,
        permanentSubDistrictList,
        permanentAreaList,
        isPersonalLoading,
        falseUpdated
    } = useSelector((state) => state.homeInfo);
    const { firstName, lastName, email, phone, additionalPhone, whatsapp, gender, religion, language, division, divisionId, divisionInfo, district, districtId, districtInfo, subDistrict, subDistrictId, subDistrictInfo, area, areaId, areaInfo, address, zipCode, permanentDivision, permanentDivisionId, permanentDivisionInfo, permanentDistrict, permanentDistrictId, permanentDistrictInfo, permanentSubDistrict, permanentSubDistrictId, permanentSubDistrictInfo, permanentArea, permanentAreaId, permanentAreaInfo, permanentAddress, permanentZipCode, fatherName, fatherPhone, motherName, motherPhone, localGuardianPhone, guardianRelationship, tutorBriefIntroduction } = personal;

    const handleInput = (name, value) => {
        dispatch(GetPersonalInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(PersonalSubmit(personal, clientData._id))
    }
    useEffect(() => {
        dispatch(GetDivisionList());
    }, []);

    useEffect(() => {
        if (clientData) dispatch(SetPersonalData(clientData));
    }, [clientData]);

    useEffect(() => {
        if (divisionId?.length > 0) dispatch(DistrictByDivisionId(divisionId));
        if (districtId?.length > 0) dispatch(SubDistrictByDistrictId(districtId));
        if (subDistrictId?.length > 0) dispatch(AreaBySubDistrictId(subDistrictId));
        if (permanentDivisionId?.length > 0) dispatch(DistrictByDivisionId(permanentDivisionId, "permanent"));
        if (permanentDistrictId?.length > 0) dispatch(SubDistrictByDistrictId(permanentDistrictId, "permanent"));
        if (permanentSubDistrictId?.length > 0) dispatch(AreaBySubDistrictId(permanentSubDistrictId, "permanent"));
    }, [divisionId, districtId, subDistrictId, permanentDivisionId, permanentDistrictId, permanentSubDistrictId]);
    useEffect(() => {
        if (falseUpdated) {
            dispatch(FalseUpdated())
            setActiveState("educational")
        }
    }, [falseUpdated])

    return (
        <>

            <div className="tu-profilewrapper">
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>{t.personalDetails}</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{t.firstName}<em className="color-red">*</em></label>
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
                                                        <span>{t.yourFirstName}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{t.lastName}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your last name"
                                                        value={lastName}
                                                        onChange={(e) => handleInput("lastName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{t.yourLastName}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Email Address"}<em className="color-red">*</em></label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-mail"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter email address"
                                                            value={email}
                                                            onChange={(e) => handleInput("email", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.enterEmailAddress}</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{t.phoneNumber}<em className="color-red">*</em></label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-phone-call"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter phone number"
                                                            value={phone}
                                                            onChange={(e) => handleInput("phone", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.hideMobile}</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Additional Phone Number(Optional)"}</label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-phone-call"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter phone number"
                                                            value={additionalPhone}
                                                            onChange={(e) => handleInput("additionalPhone", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.hideMobile}</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Whatsapp Number(Optional)"}</label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="fa-brands fa-whatsapp"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Enter whatsapp number"
                                                            value={whatsapp}
                                                            onChange={(e) => handleInput("whatsapp", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.enterWhatsappNumber}</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Gender"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={genderOp()}
                                                    value={gender ? { label: gender, value: gender } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select gender"
                                                    onChange={(e) => handleInput("gender", e.value)}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Religion"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={religionOp()}
                                                    value={religion ? { label: religion, value: religion } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select religion"
                                                    onChange={(e) => handleInput("religion", e.value)}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{"Language"}<em className="color-red">*</em></label>
                                                <Select
                                                    options={languageOp()}
                                                    value={language}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select group"
                                                    isMulti
                                                    onChange={(e) => handleInput("language", e)}
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
            {/* location */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>{"Your Current Location"}</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.division}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(divisionList, "divisionName", "_id")}
                                                    value={division ? { label: division, value: divisionId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select division"
                                                    onChange={(e) => {
                                                        handleInput("division", e.label)
                                                        handleInput("divisionId", e.value)
                                                        handleInput("divisionInfo", e.value)
                                                        handleInput("district", "")
                                                        handleInput("area", "")
                                                        handleInput("subDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.district}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(districtList, "districtName", "_id")}
                                                    value={district ? { label: district, value: districtId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select district"
                                                    onChange={(e) => {
                                                        handleInput("district", e.label)
                                                        handleInput("districtId", e.value)
                                                        handleInput("districtInfo", e.value)
                                                        handleInput("area", "")
                                                        handleInput("subDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.subDistrict}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(subDistrictList, "subDistrictName", "_id")}
                                                    value={subDistrict ? { label: subDistrict, value: subDistrictId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select sub district"
                                                    onChange={(e) => {
                                                        handleInput("subDistrict", e.label)
                                                        handleInput("subDistrictId", e.value)
                                                        handleInput("subDistrictInfo", e.value)
                                                        handleInput("area", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.area}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(areaList, "areaName", "_id")}
                                                    value={area ? { label: area, value: areaId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select area"
                                                    onChange={(e) => {
                                                        handleInput("area", e.label)
                                                        handleInput("areaId", e.value)
                                                        handleInput("areaInfo", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.detailsAddress}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                        placeholder="Enter zipcode"
                                                        value={address}
                                                        onChange={(e) => handleInput("address", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{t.detailsAddress}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.zipcode}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        required placeholder="Enter zipcode"
                                                        value={zipCode}
                                                        onChange={(e) => handleInput("zipCode", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{t.enterZipCode}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>{"Your Permanent Location"}</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.division}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(divisionList, "divisionName", "_id")}
                                                    value={permanentDivision ? { label: permanentDivision, value: permanentDivisionId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select division"
                                                    onChange={(e) => {
                                                        handleInput("permanentDivision", e.label)
                                                        handleInput("permanentDivisionId", e.value)
                                                        handleInput("permanentDivisionInfo", e.value)
                                                        handleInput("permanentDistrict", "")
                                                        handleInput("permanentArea", "")
                                                        handleInput("permanentSubDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.district}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(permanentDistrictList, "districtName", "_id")}
                                                    value={permanentDistrict ? { label: permanentDistrict, value: permanentDistrictId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select district"
                                                    onChange={(e) => {
                                                        handleInput("permanentDistrict", e.label)
                                                        handleInput("permanentDistrictId", e.value)
                                                        handleInput("permanentDistrictInfo", e.value)
                                                        handleInput("permanentArea", "")
                                                        handleInput("permanentSubDistrict", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.subDistrict}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(permanentSubDistrictList, "subDistrictName", "_id")}
                                                    value={permanentSubDistrict ? { label: permanentSubDistrict, value: permanentSubDistrictId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select sub district"
                                                    onChange={(e) => {
                                                        handleInput("permanentSubDistrict", e.label)
                                                        handleInput("permanentSubDistrictId", e.value)
                                                        handleInput("permanentSubDistrictInfo", e.value)
                                                        handleInput("permanentArea", "")
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.area}<em className="color-red">*</em></label>
                                                <Select
                                                    options={GlobalOptions(permanentAreaList, "areaName", "_id")}
                                                    value={permanentArea ? { label: permanentArea, value: permanentAreaId } : null}
                                                    classNamePrefix="react-select"
                                                    className="w-100"
                                                    placeholder="Select area"
                                                    onChange={(e) => {
                                                        handleInput("permanentArea", e.label)
                                                        handleInput("permanentAreaId", e.value)
                                                        handleInput("permanentAreaInfo", e.value)
                                                    }}
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                />
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.detailsAddress}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                        placeholder="Enter zipcode"
                                                        value={permanentAddress}
                                                        onChange={(e) => handleInput("permanentAddress", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{t.detailsAddress}</span>
                                                        {/* <em>*</em> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-3half">
                                                <label className="tu-label">{t.zipcode}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        required placeholder="Enter zipcode"
                                                        value={permanentZipCode}
                                                        onChange={(e) => handleInput("permanentZipCode", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{t.enterZipCode}</span>
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
            {/* parental info */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>{"Parental Info"}</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Fathers name"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your father name"
                                                        value={fatherName}
                                                        onChange={(e) => handleInput("fatherName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Your father name"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Father Phone Number"}<em className="color-red">*</em></label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-phone-call"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter phone number"
                                                            value={fatherPhone}
                                                            onChange={(e) => handleInput("fatherPhone", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.hideMobile}</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Mother Name(Optional)"}</label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your last name"
                                                        value={motherName}
                                                        onChange={(e) => handleInput("motherName", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"Your mother name"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Mother Phone Number(Optional)"}</label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-phone-call"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter phone number"
                                                            value={motherPhone}
                                                            onChange={(e) => handleInput("motherPhone", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.hideMobile}</span>

                                                        </div>
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
            {/* extra info */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                    <div className="tu-boxarea">
                        <div className="tu-boxsm">
                            <div className="tu-boxsmtitle">
                                <h4>{"Extra Info"}</h4>
                            </div>
                        </div>
                        <div className="tu-box">
                            <form className="tu-themeform tu-dhbform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group-wrap">
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Local Guardian Number(On Emergency)"}<em className="color-red">*</em></label>
                                                <div className="tu-inputicon">
                                                    <div className="tu-facebookv3">
                                                        <i className="icon icon-phone-call"></i>
                                                    </div>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Enter phone number"
                                                            value={localGuardianPhone}
                                                            onChange={(e) => handleInput("localGuardianPhone", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{t.hideMobile}</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <label className="tu-label">{"Guardian Relationship"}<em className="color-red">*</em></label>
                                                <div className="tu-placeholderholder">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="Your last name"
                                                        value={guardianRelationship}
                                                        onChange={(e) => handleInput("guardianRelationship", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>{"enter guardian relationship"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="tu-label">{t.aBriefIntro}<em className="color-red"></em></label>
                                                <div className="tu-placeholderholder">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Enter description"
                                                        value={tutorBriefIntroduction}
                                                        onChange={(e) => handleInput("tutorBriefIntroduction", e.target.value)}
                                                    // onChange={(e) => tutorBriefIntroduction?.length < 500 && handleInput("tutorBriefIntroduction", e.target.value)}
                                                    ></textarea>
                                                    <div className="tu-placeholder">
                                                        <span>{"Write about yourself..."}</span>
                                                    </div>
                                                </div>
                                                <div className="tu-input-counter">
                                                    <span>{t.charLeft}:</span>
                                                    <b>{lan === "en" ? 500 - tutorBriefIntroduction?.length || 0 : convertToBanglaNumber(500 - tutorBriefIntroduction?.length || 0)}</b>
                                                    /
                                                    <em>{t.fiveTh}</em>
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

export default PersonalDetails
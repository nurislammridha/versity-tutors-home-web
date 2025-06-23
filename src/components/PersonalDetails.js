import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'
import Select from 'react-select'
const PersonalDetails = ({ clientData }) => {
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
                                                    <label className="tu-label">{t.firstName}</label>
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
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.lastName}</label>
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
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{"Email Address"}</label>
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
                                                                value={""}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.enterEmailAddress}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.phoneNumber}</label>
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
                                                                value={""}
                                                                onChange={(e) => setPhone(e.target.value)}
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
                                                                value={""}
                                                                // value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
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
                                                                value={""}
                                                                // value={whatsapp}
                                                                onChange={(e) => setWhatsapp(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.enterWhatsappNumber}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Gender"}</label>
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
                                                    <label className="tu-label">{"Religion"}</label>
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
                                                    <label className="tu-label">{"Language"}</label>
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
                                                    <label className="tu-label">{t.division}</label>
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
                                                    <label className="tu-label">{t.district}</label>
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
                                                    <label className="tu-label">{t.subDistrict}</label>
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
                                                    <label className="tu-label">{t.area}</label>
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
                                                    <label className="tu-label">{t.detailsAddress}</label>
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
                                                    <label className="tu-label">{t.division}</label>
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
                                                    <label className="tu-label">{t.district}</label>
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
                                                    <label className="tu-label">{t.subDistrict}</label>
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
                                                    <label className="tu-label">{t.area}</label>
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
                                                    <label className="tu-label">{t.detailsAddress}</label>
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
                        </div>
                    </div>

                </div>
                {/* parental info */}
                <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">
                            <div className="tu-boxsm">
                                <div className="tu-boxsmtitle">
                                    <h4>{"Personal Info"}</h4>
                                </div>
                            </div>
                            <div className="tu-box">
                                <form className="tu-themeform tu-dhbform">
                                    <fieldset>
                                        <div className="tu-themeform__wrap">
                                            <div className="form-group-wrap">
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{"Fathers name"}</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your father name"
                                                            value={firstName}
                                                            onChange={(e) => handleInput("firstName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Your father name"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{"Father Phone Number"}</label>
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
                                                                value={""}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.hideMobile}</span>
                                                                {/* <em>*</em> */}
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
                                                            value={lastName}
                                                            onChange={(e) => handleInput("lastName", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{"Your mother name"}</span>
                                                            <em>*</em>
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
                                                                value={""}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.hideMobile}</span>
                                                                {/* <em>*</em> */}
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
                                                    <label className="tu-label">{"Local Guardian Number(On Emergency"}</label>
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
                                                                value={""}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.hideMobile}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{"Guardian Relationship"}</label>
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
                                                            <span>{"enter guardian relationship"}</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">{t.aBriefIntro}</label>
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
                                                        <b>{language === "en" ? 500 - tutorBriefIntroduction?.length || 0 : convertToBanglaNumber(500 - tutorBriefIntroduction?.length || 0)}</b>
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
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalDetails
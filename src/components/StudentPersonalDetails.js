import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'

const StudentPersonalDetails = ({ clientData }) => {
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
                <div class="mb24 mo-tab student-tab">
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
                                    <img src="images/card.png" alt="Tuition Info" />
                                </div>

                                <div class="tab-label">Tuition Info</div>
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
                                                            <option label={"Select gender"}></option>
                                                            {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.divisionName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Religion"}</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select religion"
                                                            data-placeholderinput="Select religion"
                                                            className="form-control"
                                                            required
                                                            value={districtId}
                                                            onChange={(e) => {
                                                                handleInput("districtId", e.target.value)
                                                                handleInput("districtInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={"Select religion"}></option>
                                                            {districtList?.length > 0 && districtList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.districtName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{"Language"}</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select language"
                                                            data-placeholderinput="Select language"
                                                            className="form-control"
                                                            required
                                                            value={subDistrictId}
                                                            onChange={(e) => {
                                                                handleInput("subDistrictId", e.target.value)
                                                                handleInput("subDistrictInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={"Select language"}></option>
                                                            {subDistrictList?.length > 0 && subDistrictList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.subDistrictName}</option>
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
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select Division"
                                                            data-placeholderinput="Select Division"
                                                            className="form-control"
                                                            required
                                                            value={divisionId}
                                                            onChange={(e) => {
                                                                handleInput("divisionId", e.target.value)
                                                                handleInput("divisionInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={t.selectDivision}></option>
                                                            {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.divisionName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{t.district}</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select city"
                                                            data-placeholderinput="Select city"
                                                            className="form-control"
                                                            required
                                                            value={districtId}
                                                            onChange={(e) => {
                                                                handleInput("districtId", e.target.value)
                                                                handleInput("districtInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={t.selectDistrict}></option>
                                                            {districtList?.length > 0 && districtList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.districtName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{t.subDistrict}</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select city"
                                                            data-placeholderinput="Select city"
                                                            className="form-control"
                                                            required
                                                            value={subDistrictId}
                                                            onChange={(e) => {
                                                                handleInput("subDistrictId", e.target.value)
                                                                handleInput("subDistrictInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={t.selectSubDistrict}></option>
                                                            {subDistrictList?.length > 0 && subDistrictList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.subDistrictName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">{t.area}</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select city"
                                                            data-placeholderinput="Select city"
                                                            className="form-control"
                                                            required
                                                            value={areaId}
                                                            onChange={(e) => {
                                                                handleInput("areaId", e.target.value)
                                                                handleInput("areaInfo", e.target.value)
                                                            }}
                                                        >
                                                            <option label={t.selectArea}></option>
                                                            {areaList?.length > 0 && areaList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.areaName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
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

                {/* extra info */}
                <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>
                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">

                            <div className="tu-box">
                                <div className="form-group" >
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

export default StudentPersonalDetails
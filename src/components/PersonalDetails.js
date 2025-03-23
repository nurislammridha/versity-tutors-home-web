import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PersonalDetails = ({ clientData }) => {
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
                <div className="tu-profilewrapper">
                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">
                            <div className="tu-boxsm">
                                <div className="tu-boxsmtitle">
                                    <h4>Personal details</h4>
                                </div>
                            </div>
                            <div className="tu-box">
                                <form className="tu-themeform tu-dhbform">
                                    <fieldset>
                                        <div className="tu-themeform__wrap">
                                            <div className="form-group-wrap">
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">First name</label>
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
                                                            <span>Your first name</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Last name</label>
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
                                                            <span>Your last name</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Your Title</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            placeholder={isTutorAccount ? "Ex: BSC in MATH" : "Ex: HSC in Science"}
                                                            value={tagline}
                                                            onChange={(e) => handleInput("tagline", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>{isTutorAccount ? "Ex: BSC in MATH" : "Ex: HSC in Science"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Monthly fee</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            required=""
                                                            placeholder="Your monthly fee"
                                                            value={hourlyFee}
                                                            onChange={(e) => handleInput("hourlyFee", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>Your monthly fee</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Division</label>
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
                                                            <option label="Select Division"></option>
                                                            {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.divisionName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">District</label>
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
                                                            <option label="Select District"></option>
                                                            {districtList?.length > 0 && districtList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.districtName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Sub District</label>
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
                                                            <option label="Select Sub District"></option>
                                                            {subDistrictList?.length > 0 && subDistrictList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.subDistrictName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Area</label>
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
                                                            <option label="Select Area"></option>
                                                            {areaList?.length > 0 && areaList.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.areaName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Details Address</label>
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
                                                            <span>Details Address</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Zipcode</label>
                                                    <div className="tu-placeholderholder">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            required placeholder="Enter zipcode"
                                                            value={zipCode}
                                                            onChange={(e) => handleInput("zipCode", e.target.value)}
                                                        />
                                                        <div className="tu-placeholder">
                                                            <span>Enter zipcode</span>
                                                            {/* <em>*</em> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Gender</label>
                                                    <div className="tu-select">
                                                        <select
                                                            data-placeholder="Select city"
                                                            data-placeholderinput="Select city"
                                                            className="form-control"
                                                            required
                                                            value={gender}
                                                            onChange={(e) => {
                                                                handleInput("gender", e.target.value)
                                                            }}
                                                        >
                                                            <option label="Select Gender"></option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label className="tu-label">Languages</label>
                                                    <div className="tu-select">
                                                        <select id="selectv5" data-placeholder="Select languages you know" className="form-control" required>
                                                            <option label="Select languages you know"></option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                        </select>
                                                    </div>
                                                    <ul className="tu-labels">
                                                        <li><span>Arabic <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>English <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Chinese <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Hebrew <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Spanish <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>German <a ="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                    </ul>
                                                </div> */}
                                                <div className="form-group">
                                                    <label className="tu-label">I can teach on</label>
                                                    <ul className="tu-status-filter">
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
                                                                    <label for="home">My home</label>
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
                                                                    <label for="home1">Student home</label>
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
                                                                    <label for="online">Online</label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">A brief introduction</label>
                                                    <div className="tu-placeholderholder">
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Enter description"
                                                            value={tutorBriefIntroduction}
                                                            onChange={(e) => handleInput("tutorBriefIntroduction", e.target.value)}
                                                        // onChange={(e) => tutorBriefIntroduction?.length < 500 && handleInput("tutorBriefIntroduction", e.target.value)}
                                                        ></textarea>
                                                        <div className="tu-placeholder">
                                                            <span>Enter description</span>
                                                        </div>
                                                    </div>
                                                    <div className="tu-input-counter">
                                                        <span>Characters left:</span>
                                                        <b>{500 - tutorBriefIntroduction?.length || 0}</b>
                                                        /
                                                        <em> 500</em>
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
                        <span>Save & update the latest changes to the live</span>
                        <a

                            className="tu-primbtn-lg tu-primbtn-orange"
                            onClick={() => !isPersonalLoading && handleSubmit()}
                        >
                            {isPersonalLoading ? "Saving.." : "Save & update"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalDetails
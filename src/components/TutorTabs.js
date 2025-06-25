import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction'
import Select from 'react-select'
import PersonalDetails from './PersonalDetails'
import EducationalDetails from './EducationalDetails'
import TuitionInfo from './TuitionInfo'
import DocumentInfo from './DocumentInfo'
const TutorTabs = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [activeState, setActiveState] = useState("personal")
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
                        <div class="tab-col" onClick={() => setActiveState("personal")}>
                            <div className={`tab-card ${activeState === "personal" ? "active" : ""}`} >
                                <div className='mo-card'>
                                    <img src="images/award.png" alt="Personal Info" />
                                </div>

                                <div class="tab-label">Personal Info</div>
                            </div>
                        </div>
                        <div class="tab-col" onClick={() => setActiveState("educational")}>
                            <div className={`tab-card ${activeState === "educational" ? "active" : ""}`}>
                                <div className='mo-card'>
                                    <img src="images/man.png" alt="Educational Info" />
                                </div>

                                <div class="tab-label">Educational Info</div>
                            </div>
                        </div>
                        <div class="tab-col" onClick={() => setActiveState("tutor")}>
                            <div className={`tab-card ${activeState === "tutor" ? "active" : ""}`}>
                                <div className='mo-card'>
                                    <img src="images/card.png" alt="Tuition Info" />
                                </div>

                                <div class="tab-label">Tuition Info</div>
                            </div>
                        </div>
                        <div class="tab-col" onClick={() => setActiveState("document")}>
                            <div className={`tab-card ${activeState === "document" ? "active" : ""}`}>
                                <div className='mo-card'>
                                    <img src="images/upload.png" alt="Document Info" />
                                </div>

                                <div class="tab-label">Document Info</div>
                            </div>
                        </div>
                    </div>
                </div>

                {activeState === "personal" && <PersonalDetails clientData={clientData} />}
                {activeState === "educational" && <EducationalDetails clientData={clientData} />}
                {activeState === "tutor" && <TuitionInfo clientData={clientData} />}
                {activeState === "document" && <DocumentInfo clientData={clientData} />}
            </div>
        </>
    )
}

export default TutorTabs
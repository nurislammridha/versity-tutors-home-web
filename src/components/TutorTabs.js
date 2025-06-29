import { useLanguage } from '@/context/LanguageContext'
import React, { useEffect, useState } from 'react'
import PersonalDetails from './PersonalDetails'
import EducationalDetails from './EducationalDetails'
import TuitionInfo from './TuitionInfo'
import DocumentInfo from './DocumentInfo'
import { useDispatch } from 'react-redux'
import { GetClientById } from '@/redux/_redux/CommonAction'
const TutorTabs = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [activeState, setActiveState] = useState("personal") //personal
    useEffect(() => {
        clientData !== null && dispatch(GetClientById(clientData?._id))
    }, [clientData])

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

                {activeState === "personal" && <PersonalDetails clientData={clientData} setActiveState={setActiveState} />}
                {activeState === "educational" && <EducationalDetails clientData={clientData} setActiveState={setActiveState} />}
                {activeState === "tutor" && <TuitionInfo clientData={clientData} setActiveState={setActiveState} />}
                {activeState === "document" && <DocumentInfo clientData={clientData} setActiveState={setActiveState} />}
            </div>
        </>
    )
}

export default TutorTabs
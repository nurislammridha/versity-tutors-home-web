import { useLanguage } from '@/context/LanguageContext'
import { GetClientById } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import StudentPersonalDetails from './StudentPersonalDetails'
import StudentTuitionInfo from './StudentTuitionInfo'

const StudentTabs = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [activeState, setActiveState] = useState("personal") //personal
    useEffect(() => {
        clientData !== null && dispatch(GetClientById(clientData?._id))
    }, [clientData])

    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="mb24 mo-tab student-tab">
                    <div className="d-flex flex-wrap justify-content-between tab-row">
                        <div className="tab-col" onClick={() => setActiveState("personal")}>
                            <div className={`tab-card ${activeState === "personal" ? "active" : ""}`}>
                                <div className='mo-card'>
                                    <img src="images/award.png" alt="Personal Info" />
                                </div>

                                <div className="tab-label">Personal Info</div>
                            </div>
                        </div>

                        <div className="tab-col" onClick={() => setActiveState("tutor")}>
                            <div className={`tab-card ${activeState === "tutor" ? "active" : ""}`}>
                                <div className='mo-card'>
                                    <img src="images/card.png" alt="Tuition Info" />
                                </div>

                                <div className="tab-label">Tuition Info</div>
                            </div>
                        </div>

                    </div>
                </div>

                {activeState === "personal" && <StudentPersonalDetails clientData={clientData} setActiveState={setActiveState} />}
                {activeState === "tutor" && <StudentTuitionInfo clientData={clientData} setActiveState={setActiveState} />}

            </div>
        </>
    )
}

export default StudentTabs
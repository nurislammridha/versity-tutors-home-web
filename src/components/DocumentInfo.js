import { useLanguage } from '@/context/LanguageContext'
import { AreaBySubDistrictId, DistrictByDivisionId, GetDivisionList, GetPersonalInput, PersonalSubmit, SetPersonalData, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import styles from './localCss/uploader.module.css'
import { useDispatch, useSelector } from 'react-redux'
import docImg from '../../public/images/doc.png'
import id from '../../public/images/id.png'
import Image from 'next/image'
const initialDocs = [
    { id: 1, title: 'NID', status: 'uploaded', img: '/images/uploaded-nid.png' },
    { id: 2, title: 'Upload HSC Certificate', status: 'uploading', progress: 75 },
    { id: 3, title: 'Upload SSC / O Level Certificate', status: 'initial' },
    { id: 4, title: 'Upload HSC / A Level Certificate', status: 'initial' },
    { id: 5, title: 'Upload Pay in slip (1st year)', status: 'initial' },
];

const DocumentInfo = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [documents, setDocuments] = useState(initialDocs);
    const [status, setStatus] = useState('uploaded'); // 'uploaded' or 'request'
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
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
    const handlePreview = (img) => {
        setModalImage(img);
        setShowModal(true);
    };
    return (
        <>
            <div className="container py-4">
                {/* Top buttons */}
                <div className="row mb-4 align-items-center">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <h5 className="fw-bold mb-1">My Documents</h5>
                        <p className="mb-0">1 document upload</p>
                    </div>

                    <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end gap-2">
                        <button
                            className={`px-3 py-1 border rounded-2 small fw-medium ${status === 'uploaded' ? 'border-dark text-dark bg-white' : 'bg-white border-light text-muted'}`}
                            style={{ fontSize: '13px' }}
                            onClick={() => setStatus('uploaded')}
                        >
                            Status: Uploaded
                        </button>
                        <button
                            className={`px-3 py-1 border rounded-2 small fw-medium ${status === 'request' ? 'bg-secondary text-white' : 'bg-light text-dark'}`}
                            style={{ fontSize: '13px' }}
                            onClick={() => setStatus('request')}
                        >
                            Request to Admin
                        </button>
                    </div>
                </div>


                <div className="row g-4">
                    {/* Card 1: NID */}
                    <div className="col-6 col-md-4">
                        <div className={styles.uploadCard}>
                            <div className={`${styles.cardTop}`} onClick={() => handlePreview('/images/uploaded-nid.png')}>
                                <Image
                                    src={id}
                                    alt="NID"
                                    width={200}
                                    height={130}
                                    className="img-fluid"
                                />
                                <div className={styles.hoverOverlay}>
                                    <i className={`fas fa-eye ${styles.hoverIcon}`} title="Preview"></i>
                                    <i className={`fas fa-trash ${styles.hoverIcon}`} title="Delete"></i>
                                </div>
                            </div>
                            <div className={styles.cardBottom}>
                                <p className="mb-0  text-center">NID</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Uploading */}
                    <div className="col-6 col-md-4">
                        <div className={styles.uploadCard}>
                            <div className={`${styles.cardTop} d-flex flex-column justify-content-center align-items-center`}>
                                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                                    <path
                                        className={styles.circleBg}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={styles.circle}
                                        strokeDasharray="75, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" className={styles.percentage}>75%</text>
                                </svg>
                                <p className="mt-2 mb-1">Uploading...</p>
                                <button className="btn btn-sm btn-outline-white bg-white px-4">Cancel</button>
                            </div>
                            <div className={styles.cardBottom}>
                                <p className="mb-0  text-center">Upload HSC Certificate</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: SSC */}
                    <div className="col-6 col-md-4">
                        <div className={styles.uploadCard}>
                            <div className={`${styles.cardTop} d-flex flex-column justify-content-center align-items-center`}>
                                <Image src={docImg} alt="Upload" width={100} height={100} className="mb-2" />

                            </div>
                            <div className={styles.cardBottom}>
                                <p className="mb-0  text-center">Upload SSC / O Level Certificate</p>
                                <p className="mb-0 text-muted small text-center">Drag and drop or <a href="#">Select a File</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: A Level */}
                    <div className="col-6 col-md-4">
                        <div className={styles.uploadCard}>
                            <div className={`${styles.cardTop} d-flex flex-column justify-content-center align-items-center`}>
                                <Image src={docImg} alt="Upload" width={100} height={100} className="mb-2" />

                            </div>
                            <div className={styles.cardBottom}>
                                <p className="mb-0  text-center">Upload HSC / A Level Certificate</p>
                                <p className="mb-0 text-muted small text-center">Drag and drop or <a href="#">Select a File</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Pay Slip */}
                    <div className="col-6 col-md-4">
                        <div className={styles.uploadCard}>
                            <div className={`${styles.cardTop} d-flex flex-column justify-content-center align-items-center`}>
                                <Image src={docImg} alt="Upload" width={100} height={100} className="mb-2" />

                            </div>
                            <div className={styles.cardBottom}>
                                <p className="mb-0  text-center">Upload Pay in slip (1st year)</p>
                                <p className="mb-0 text-muted small text-center">Drag and drop or <a href="#">Select a File</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                {/* <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-outline-secondary">← Previous</button>
                        <button className="btn btn-dark">Save & Update →</button>
                    </div> */}
            </div>

            {/* should you take a demo class */}
            <div className="tu-profilewrapper" style={{ marginTop: "24px" }}>

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

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">NID</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <Image src={id} alt="Preview" width={400} height={250} />
                            </div>
                            <div className="px-3 py-3 d-flex gap-2">
                                <button
                                    type="button"
                                    className="w-50 text-dark bg-white border rounded-2 py-2"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        borderColor: '#dee2e6'
                                    }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="w-50 text-white bg-danger border-0 rounded-2 py-2"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500
                                    }}
                                >
                                    Delete
                                </button>
                            </div>





                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default DocumentInfo
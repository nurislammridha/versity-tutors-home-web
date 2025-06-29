import React, { useEffect, useState } from 'react';
import styles from './localCss/uploader.module.css';
import docImg from '../../public/images/doc.png';
import id from '../../public/images/id.png';
import Image from 'next/image';
import { FalseUpdated, GetDocumentByClientId, RemoveImgByPublicId, UploadDocInCloudinary } from '@/redux/_redux/CommonAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiDataToLocalObject } from '../../public/function/globalFunction';

const uploadItems = [
    { id: 'nid', title: 'Upload NID', docTitle: "nid" },
    { id: 'hscCert', title: 'Upload SSC Certificate', docTitle: "hsc" },
    { id: 'sscCert', title: 'Upload HSC / O Level Certificate', docTitle: "ssc" },
    { id: 'aLevelCert', title: 'Upload Bachelor', docTitle: "bachelor" },
    { id: 'paymentSlip', title: 'Upload Pay in slip (1st year)', docTitle: "slip" },
];

const DocumentInfo = ({ clientData, setActiveState }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('uploaded'); // 'uploaded' or 'request'
    const [modalImage, setModalImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [publicId, setPublicId] = useState("");
    const [docId, setDocId] = useState("");
    const [uploadStates, setUploadStates] = useState(
        uploadItems.reduce((acc, item) => {
            acc[item.id] = {
                progress: 0,
                isUploading: false,
                image: null,
            };
            return acc;
        }, {})
    );
    const { documentData, falseUpdated, imageDeleteLoading } = useSelector((state) => state.homeInfo);
    console.log('uploadStates', uploadStates)
    // console.log('modalImage', modalImage)
    const handlePreview = (state) => {
        // ?.image?.url ? state?.image?.url : state.image
        setModalImage(state?.image?.url);
        setPublicId(state?.image?.publicId)
        setDocId(state?.docInfo?._id)
        setShowModal(true);
    };

    const handleFileUpload = (file, itemId, title) => {
        dispatch(UploadDocInCloudinary(title, file, clientData?._id))
        const reader = new FileReader();
        let progress = 0;

        setUploadStates((prev) => ({
            ...prev,
            [itemId]: { ...prev[itemId], isUploading: true, progress: 0 },
        }));

        const interval = setInterval(() => {
            progress += 5;
            setUploadStates((prev) => ({
                ...prev,
                [itemId]: { ...prev[itemId], progress },
            }));

            if (progress >= 100) {
                clearInterval(interval);
                reader.onloadend = () => {
                    setUploadStates((prev) => ({
                        ...prev,
                        [itemId]: {
                            ...prev[itemId],
                            image: reader.result,
                            isUploading: false,
                            progress: 100,
                        },
                    }));
                };
                reader.readAsDataURL(file);
            }
        }, 100);
    };
    // const handleFileUpload = async (file) => {
    //         const formData = new FormData();
    //         formData.append('file', file);

    //         setIsUploading(true);
    //         setUploadProgress(0);

    //         try {
    //             await axios.post('/api/upload', formData, {
    //                 onUploadProgress: (progressEvent) => {
    //                     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //                     setUploadProgress(percent);
    //                 },
    //             });

    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 setUploadedImage(reader.result);
    //                 setIsUploading(false);
    //             };
    //             reader.readAsDataURL(file);
    //         } catch (error) {
    //             console.error('Upload failed', error);
    //             setIsUploading(false);
    //         }
    //     };
    const handleDrop = (e, itemId, title) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file, itemId, title);
    };

    const handleFileChange = (e, itemId, title) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file, itemId, title);
    };
    const handleDelete = () => {
        dispatch(RemoveImgByPublicId(publicId, docId, clientData?._id))
    };
    useEffect(() => {
        if (clientData?._id) {
            dispatch(GetDocumentByClientId(clientData?._id))
        }

    }, [clientData])
    useEffect(() => {
        if (documentData) {
            setShowModal(false)
            setUploadStates(mapApiDataToLocalObject(documentData))
        }
    }, [documentData])
    // useEffect(() => {
    //     if (falseUpdated) {
    //         // setShowModal(false)
    //         dispatch(GetDocumentByClientId(clientData?._id))
    //         dispatch(FalseUpdated())
    //     }
    // }, [falseUpdated])

    return (
        <>
            <div className="container py-4">
                {/* Top buttons */}
                <div className="row mb-4 align-items-center">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <h5 className="fw-bold mb-1">My Documents</h5>
                        <p className="mb-0">Upload your documents below</p>
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end gap-2">
                        <button
                            className={`px-3 py-1 border rounded-2 small fw-medium ${status === 'uploaded'
                                ? 'border-dark text-dark bg-white'
                                : 'bg-white border-light text-muted'
                                }`}
                            style={{ fontSize: '13px' }}
                            onClick={() => setStatus('uploaded')}
                        >
                            Status: Uploaded
                        </button>
                        <button
                            className={`px-3 py-1 border rounded-2 small fw-medium ${status === 'request'
                                ? 'bg-secondary text-white'
                                : 'bg-light text-dark'
                                }`}
                            style={{ fontSize: '13px' }}
                            onClick={() => setStatus('request')}
                        >
                            Request to Admin
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    {uploadItems.map((item) => {
                        const state = uploadStates[item.id];
                        return (
                            <div key={item.id} className="col-6 col-md-4">
                                <div className={styles.uploadCard}>
                                    <div
                                        className={`${styles.cardTop} d-flex flex-column justify-content-center align-items-center`}
                                        onDrop={(e) => handleDrop(e, item.id, item.docTitle)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() =>
                                            state.image && !state.isUploading && handlePreview(state)
                                        }
                                    >
                                        {!state.image && !state.isUploading && (
                                            <>
                                                <Image
                                                    src={docImg}
                                                    alt="Upload"
                                                    width={100}
                                                    height={100}
                                                    className="mb-2"
                                                    onClick={() =>
                                                        document.getElementById(`${item.id}-upload`).click()
                                                    }
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="file"
                                                    hidden
                                                    id={`${item.id}-upload`}
                                                    onChange={(e) => handleFileChange(e, item.id, item.docTitle)}
                                                />
                                            </>
                                        )}

                                        {state.isUploading && (
                                            <>
                                                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                                                    <path
                                                        className={styles.circleBg}
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path
                                                        className={styles.circle}
                                                        strokeDasharray={`${state.progress}, 100`}
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <text x="18" y="20.35" className={styles.percentage}>
                                                        {state.progress}%
                                                    </text>
                                                </svg>
                                                <p className="mt-2 mb-1">Uploading...</p>
                                            </>
                                        )}

                                        {state.image && !state.isUploading && (
                                            <>
                                                <Image
                                                    src={state?.image?.url ? state?.image?.url : state.image}
                                                    alt="Uploaded"
                                                    width={200}
                                                    height={130}
                                                    className="img-fluid"
                                                />
                                                <div className={styles.hoverOverlay}>
                                                    <i
                                                        className={`fas fa-eye ${styles.hoverIcon}`}
                                                        title="Preview"
                                                    // onClick={() => handlePreview(state?.image?.url ? state?.image?.url : state.image)}
                                                    ></i>
                                                    <i
                                                        className={`fas fa-trash ${styles.hoverIcon}`}
                                                        title="Delete"
                                                        onClick={() =>
                                                            setUploadStates((prev) => ({
                                                                ...prev,
                                                                [item.id]: { ...prev[item.id], image: null },
                                                            }))
                                                        }
                                                    ></i>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.cardBottom}>
                                        <p className="mb-0 text-center">{item.title}</p>
                                        {!state.image && !state.isUploading && (
                                            <p className="mb-0 text-muted small text-center">
                                                Drag and drop or{' '}
                                                <label
                                                    htmlFor={`${item.id}-upload`}
                                                    className="text-primary"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    Select a File
                                                </label>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="tu-profilewrapper mt-4">
                <div className="tu-btnarea-two">
                    <a
                        className="tu-primbtn-lg my-previous-btn"
                        onClick={() => setActiveState("tutor")}
                    >
                        <i className="fa-solid fa-arrow-left"></i> Previous
                    </a>
                    <a className="tu-primbtn-lg my-btn">
                        Save & Update <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Document Preview</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <Image src={modalImage || id} alt="Preview" width={400} height={250} />
                            </div>
                            <div className="px-3 py-3 d-flex gap-2">
                                <button
                                    type="button"
                                    className="w-50 text-dark bg-white border rounded-2 py-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="w-50 text-white bg-danger border-0 rounded-2 py-2"
                                    onClick={() => !imageDeleteLoading && handleDelete()}
                                >
                                    Delete
                                    {imageDeleteLoading && <div class="spinner-border spinner-border-sm ms-2"></div>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DocumentInfo;

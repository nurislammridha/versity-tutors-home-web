import { DeleteDocumentCloudinary, GetBookingByBooker, GetDocumentByClientId, UpdateBooking, UploadDocInCloudinary } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useLanguage } from '@/context/LanguageContext';
const UploadDocument = ({ clientData }) => {
    const { t, language } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const [isAdd, setAdd] = useState(false)
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isPdf, setPdf] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const isDocumentLoading = useSelector((state) => state.homeInfo.isDocumentLoading);
    const isUploadDocumentLoading = useSelector((state) => state.homeInfo.isUploadDocumentLoading);
    const isDeleteDocumentLoading = useSelector((state) => state.homeInfo.isDeleteDocumentLoading);
    const documentData = useSelector((state) => state.homeInfo.documentData);
    const handleUpload = () => {
        dispatch(UploadDocInCloudinary(title, file, clientData?._id))
    }
    const handleRemove = (item) => {
        setDeletedId(item?._id)
        confirmAlert({
            title: t.remove,
            message: t.sureToRemove,
            buttons: [
                {
                    label: t.yes,
                    onClick: () => dispatch(DeleteDocumentCloudinary(item)),
                },
                {
                    label: t.no,
                },
            ],
        });
    }
    const handlePreview = (item) => {
        const url = item?.doc?.url
        const type = url.toLowerCase().endsWith('.pdf')
        setPdf(type)
        const secureUrl = url.replace('http://', 'https://'); // Force HTTPS
        setFileUrl(secureUrl)
        setShowModal(true)
    }
    useEffect(() => {
        if (clientData?._id) {
            dispatch(GetDocumentByClientId(clientData?._id))
        }

    }, [clientData])
    useEffect(() => {
        if (documentData) {
            setAdd(false)
        }
    }, [documentData])
    console.log('isPdf', isPdf)
    console.log('fileUrl', fileUrl)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            {!isAdd ? (<>
                                <div class="tu-boxsm d-flex justify-content-between">
                                    <div class="tu-boxsmtitle">
                                        <h4>{t.docManagement}</h4>
                                    </div>
                                    <div class="tu-boxsmtitle">
                                        <a className='btn btn-success' style={{ color: "#FFF" }} onClick={() => setAdd(true)}>{t.addDoc}</a>
                                    </div>
                                </div>
                                <div class="tu-box">

                                    {!isDocumentLoading && documentData !== null && documentData.length > 0 ? (
                                        <table class="table table-striped mt-2">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">{t.title}</th>
                                                    <th scope="col">{t.date}</th>
                                                    <th scope="col">{t.preview}</th>
                                                    <th scope="col">{t.action}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {documentData.map((item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item?.title}</td>
                                                        <td>{formatDate(item?.createdAt)}</td>
                                                        <td><a className='btn btn-info btn-sm' onClick={() => handlePreview(item)}>{t.preview}</a></td>
                                                        <td>
                                                            {deletedId == item?._id && isDeleteDocumentLoading ?
                                                                <div class="spinner-border text-primary" role="status">
                                                                    <span class="sr-only">{t.loading}</span>
                                                                </div> :
                                                                <a
                                                                    className='btn btn-sm btn-danger'
                                                                    onClick={() => !isDeleteDocumentLoading && handleRemove(item)}
                                                                >
                                                                    <i className='fa fa-trash'></i>
                                                                </a>
                                                            }

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (<div>{t.noDataFound}</div>)
                                    }
                                </div>
                            </>) : (<>
                                <div class="tu-boxsm d-flex justify-content-between">
                                    <div class="tu-boxsmtitle">
                                        <h4>{t.addDoc}</h4>
                                    </div>
                                    <div class="tu-boxsmtitle">
                                        <a className='btn btn-success' style={{ color: "#FFF" }} onClick={() => setAdd(false)}>{t.docList}</a>
                                    </div>
                                </div>
                                <div class="tu-box">
                                    <div >
                                        <div className="mb-3">
                                            <label className="form-label">{t.docTitle}</label>
                                            <input
                                                type="text"
                                                placeholder={t.enterDocTitle}
                                                className="form-control"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">{t.chooseDoc}</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*,application/pdf"
                                                onChange={e => setFile(e.target.files[0])}
                                                required
                                            />
                                        </div>

                                        <a className="btn btn-primary" onClick={() => !isUploadDocumentLoading && handleUpload()}>{isUploadDocumentLoading ? "Uploading" : "Upload"}</a>
                                    </div>

                                </div>
                            </>)}
                        </div>
                    </div>

                </div>
            </div>
            {/* Preview Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" onClick={() => setShowModal(false)}>
                    <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{t.filePreview}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <div className="modal-body" style={{ height: '80vh' }}>
                                {isPdf ? (
                                    <iframe
                                        src={fileUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none' }}
                                    />
                                ) : (
                                    <img
                                        src={fileUrl}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UploadDocument
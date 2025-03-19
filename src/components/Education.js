"use client"
import { AddEducationSubmit, FalseEducationUpdated, GetEducationInput, SetEducationData, SetEducationUpdate } from '@/redux/_redux/CommonAction';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Education = ({ clientData }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("delete")
    const [actionId, setActionId] = useState(null)
    const modalRef = useRef(null);
    const [modalInstance, setModalInstance] = useState(null);
    const education = useSelector((state) => state.homeInfo.education);
    const educations = useSelector((state) => state.homeInfo.educations);
    const isPersonalLoading = useSelector((state) => state.homeInfo.isPersonalLoading);
    const isEducationUpdated = useSelector((state) => state.homeInfo.isEducationUpdated);
    const { degree, institute, location, startDate, endDate, description, isOngoing } = education || {}
    const handleChange = (name, value) => {
        dispatch(GetEducationInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(AddEducationSubmit(education, educations, clientData._id, action, actionId))
    }
    const handleDelete = (actionId) => {
        dispatch(AddEducationSubmit(education, educations, clientData._id, "delete", actionId))
    }
    const handleSetItem = (item) => {
        setShowModal(true)
        setAction("edit")
        setActionId(item._id)
        dispatch(SetEducationUpdate(item))
    }
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            if (modalRef.current) {
                const instance = new bootstrap.Modal(modalRef.current);
                setModalInstance(instance);
            }
        });
    }, []);
    useEffect(() => {
        if (modalInstance) {
            showModal ? modalInstance.show() : modalInstance.hide();
        }
    }, [showModal]);
    useEffect(() => {
        if (isEducationUpdated) {
            setShowModal(false)
            dispatch(FalseEducationUpdated())
        }
    }, [isEducationUpdated]);
    useEffect(() => {
        clientData !== null && dispatch(SetEducationData(clientData));
    }, [clientData]);
    // console.log('educations', educations)
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tu-profilewrapper">

                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">
                            <div className="tu-boxsm">
                                <div className="tu-boxsmtitle">
                                    <h4>Add education</h4>
                                    <a

                                        onClick={() => {
                                            setShowModal(true)
                                            setAction("add")
                                        }}
                                    >Add new</a>
                                </div>
                            </div>
                            <div className="tu-box">
                                <div className="accordion tu-accordionedu" id="accordionFlushExampleaa">
                                    <div id="tu-edusortable" className="tu-edusortable">
                                        {educations && educations.length > 0 ?
                                            educations.map((item, index) => (
                                                <div className="tu-accordion-item" key={index}>
                                                    <div className="tu-expwrapper">
                                                        <div className="tu-accordionedu">
                                                            <div className="tu-expinfo">
                                                                <div className="tu-accodion-holder">
                                                                    <h5 className="collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba">{item.degree}</h5>
                                                                    <ul className="tu-branchdetail">
                                                                        <li><i className="icon icon-home"></i><span>{item.institute}</span></li>
                                                                        <li><i className="icon icon-map-pin"></i><span>{item.location}</span></li>
                                                                        <li><i className="icon icon-calendar"></i><span>{item.startDate} - {item.isOngoing ? "Present" : item.endDate}</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="tu-icon-holder">
                                                                    <a

                                                                        onClick={() => {
                                                                            handleDelete(item._id)
                                                                        }}
                                                                    ><i className="icon icon-trash-2 tu-deleteclr"></i></a>
                                                                    <a

                                                                        onClick={() => handleSetItem(item)}><i className="icon icon-edit-3 tu-editclr"></i></a>
                                                                </div>
                                                                <i className="icon icon-plus" role="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="flush-collapseOneba" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExampleaa">
                                                        <div className="tu-edubodymain">
                                                            <div className="tu-accordioneduc">
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            : (<div>No educations data found</div>)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!-- Education Start --> */}
            <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>{action === "edit" ? "Edit" : "Add"} education</h5>
                            <a className="tu-close" onClick={() => setShowModal(false)}><i className="icon icon-x"></i></a>
                        </div>
                        <div className="modal-body">
                            <form className="tu-themeform">
                                <fieldset>
                                    <div className="tu-themeform__wrap">
                                        <div className="form-group">
                                            <label className="tu-label">Degree/course title</label>
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="text"
                                                    className="form-control tu-input-field"
                                                    placeholder="Enter title here"
                                                    required
                                                    value={degree}
                                                    onChange={(e) => handleChange("degree", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Enter title here</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="tu-label">University/Institute title</label>
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="text"
                                                    className="form-control tu-input-field"
                                                    placeholder="Enter title here"
                                                    required
                                                    value={institute}
                                                    onChange={(e) => handleChange("institute", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Enter title here</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="tu-label">Loaction</label>
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="text"
                                                    className="form-control tu-input-field"
                                                    placeholder="Enter location"
                                                    value={location}
                                                    onChange={(e) => handleChange("location", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Enter location</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group-wrap">
                                            <div className="form-group pb-0">
                                                <label className="tu-label">Start & end date</label>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <div className="tu-placeholderholder">
                                                    {/* <div className="tu-calendar"> */}
                                                    <input
                                                        type="date"
                                                        className="tu-datepicker form-control tu-input-field"
                                                        placeholder="Enter start date"
                                                        required
                                                        value={startDate}
                                                        onChange={(e) => handleChange("startDate", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>Enter start date</span>
                                                        <em>*</em>
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                            <div className="form-group form-group-half">
                                                <div className="tu-placeholderholder">
                                                    {/* <div className="tu-calendar"> */}
                                                    <input
                                                        type="date"
                                                        className="tu-datepicker form-control tu-input-field"
                                                        placeholder="Enter end date"
                                                        required
                                                        value={endDate}
                                                        onChange={(e) => handleChange("endDate", e.target.value)}
                                                    />
                                                    <div className="tu-placeholder">
                                                        <span>Enter end date</span>
                                                        <em>*</em>
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                            <div className="form-group pt-0">
                                                <div className="tu-check pt-1">
                                                    <input
                                                        type="checkbox"
                                                        id="expcheck2"
                                                        name="expcheck"
                                                        checked={isOngoing}
                                                        onChange={() => handleChange("isOngoing", !isOngoing)}
                                                    />
                                                    <label for="expcheck2">This degree/course is currently ongoing</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="tu-label">Description</label>
                                            <div className="tu-placeholderholder">
                                                <textarea
                                                    className="form-control tu-input-field"
                                                    placeholder="Enter description"
                                                    required
                                                    value={description}
                                                    onChange={(e) => description.length < 500 && handleChange("description", e.target.value)}
                                                ></textarea>
                                                <div className="tu-placeholder">
                                                    <span>Enter description</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                            <div className="tu-input-counter">
                                                <span>Characters left:</span>
                                                <b>{500 - description?.length}</b>
                                                /
                                                <em> 500</em>
                                            </div>
                                        </div>
                                        <div className="form-group tu-formbtn">
                                            <a

                                                className="tu-primbtn-lg"
                                                onClick={() => !isPersonalLoading && handleSubmit()}
                                            >
                                                {isPersonalLoading ? "Saving.." : action === "edit" ? "Update changes" : "Save changes"}
                                            </a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Education End --> */}


        </>
    )
}

export default Education
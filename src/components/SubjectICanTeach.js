import { AddSubjectSubmit, FalseEducationUpdated, GetCategoryList, GetSubCategoryByCategoryId, GetSubjectInput, SetSubjectData, SetSubjectUpdate } from '@/redux/_redux/CommonAction';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { catIdToCatName, filteredArray, subCatIdToSubCatName } from '../../public/function/globalFunction';

const SubjectICanTeach = ({ clientData }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("delete")
    const [actionId, setActionId] = useState(null)
    const modalRef = useRef(null);
    const [modalInstance, setModalInstance] = useState(null);
    const subject = useSelector((state) => state.homeInfo.subject);
    const subjects = useSelector((state) => state.homeInfo.subjects);
    const isPersonalLoading = useSelector((state) => state.homeInfo.isPersonalLoading);
    const isEducationUpdated = useSelector((state) => state.homeInfo.isEducationUpdated);
    const categoryList = useSelector((state) => state.homeInfo.categoryList);
    const subCategoryList = useSelector((state) => state.homeInfo.subCategoryList);
    const { categoryId, categoryInfo, subCategories } = subject || {}
    const handleChange = (name, value) => {
        dispatch(GetSubjectInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(AddSubjectSubmit(subject, subjects, clientData._id, action, actionId))
    }
    const handleDelete = (actionId) => {
        dispatch(AddSubjectSubmit(subjects, subjects, clientData._id, "delete", actionId))
    }
    const handleSetItem = (item) => {
        setShowModal(true)
        setAction("edit")
        setActionId(item._id)
        dispatch(SetSubjectUpdate(item))
    }
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            if (modalRef.current) {
                const instance = new bootstrap.Modal(modalRef.current);
                setModalInstance(instance);
            }
        });
        dispatch(GetCategoryList())
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
        clientData !== null && dispatch(SetSubjectData(clientData));
    }, [clientData]);
    useEffect(() => {
        subject.categoryId.length > 0 && dispatch(GetSubCategoryByCategoryId(subject.categoryId));
    }, [subject]);
    console.log('subjects', subjects)
    // console.log('subCategoryList', subCategoryList)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>I can teach</h4>
                                    <a

                                        onClick={() => {
                                            setShowModal(true)
                                            setAction("add")
                                        }}
                                    >Add new</a>
                                </div>
                            </div>
                            <div class="tu-box">
                                <ul class="tu-icanteach">

                                    {subjects && subjects.length > 0 ?
                                        subjects.map((item, index) => (
                                            <li key={index}>
                                                <div class="tu-tech-title">
                                                    <h6>{item?.categoryInfo?.categoryName}</h6>
                                                    <div class="tu-icon-holder">
                                                        <a

                                                            onClick={() => handleSetItem(item)}
                                                        >
                                                            <i class="icon icon-edit-3 tu-editclr"></i>
                                                        </a>
                                                        <a

                                                            onClick={() => handleDelete(item._id)}

                                                        >
                                                            <i class="icon icon-trash-2 tu-deleteclr"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <ul class="tu-serviceslist">
                                                    {item.subCategories.map((item2, index) => (
                                                        <li>
                                                            <a key={index}>{item2.subCategoryInfo?.subCategoryName}</a>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </li>
                                        ))
                                        : (<div>No data found</div>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!-- Services Category Start --> */}
            <div class="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>{action === "edit" ? "Edit" : "Add"} subjects</h5>
                            <a className="tu-close" onClick={() => setShowModal(false)}><i class="icon icon-x"></i></a>
                        </div>
                        <div class="modal-body">
                            <form class="tu-themeform">
                                <fieldset>
                                    <div class="tu-themeform__wrap">
                                        <div class="form-group">
                                            <label class="tu-label">Please select what you can teach</label>
                                            <div class="tu-select">
                                                <select
                                                    id="selectv10"
                                                    data-placeholder="Select country from list"
                                                    data-placeholderinput="Select category from list"
                                                    class="form-control tu-input-field"
                                                    required
                                                    value={subject.categoryId}
                                                    onChange={(e) => {
                                                        handleChange("categoryId", e.target.value)
                                                        handleChange("categoryInfo", e.target.value)
                                                        handleChange("subCategories", "")
                                                    }}
                                                >
                                                    <option label="Select education level"></option>
                                                    {categoryList?.length > 0 && categoryList.map((item, index) => (
                                                        <option key={index} value={item._id}>{item.categoryName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="tu-select">
                                                <select
                                                    id="selectv11"
                                                    data-placeholder="Select subject from list"
                                                    data-placeholderinput="Select category from list"
                                                    class="form-control tu-input-field"
                                                    required
                                                    onChange={(e) => {
                                                        handleChange("subCategories", e.target.value)
                                                    }}
                                                >
                                                    <option label="Select subject from list"></option>
                                                    {subCategoryList?.length > 0 &&
                                                        filteredArray(subCategoryList, subject.subCategories).map((item, index) => (
                                                            <option key={index} value={item._id}>{item.subCategoryName}</option>
                                                        ))}
                                                </select>
                                            </div>
                                            <ul class="tu-labels">

                                                {subject.subCategories.length > 0 && subject.subCategories.map((item, index) => (
                                                    <li key={index}>
                                                        <span>{subCatIdToSubCatName(item.subCategoryId, subCategoryList)}
                                                            <a
                                                                onClick={() => handleChange("remove", item.subCategoryId)}
                                                            ><i class="icon icon-x"></i></a></span></li>
                                                ))}

                                            </ul>
                                        </div>
                                        <div class="form-group tu-formbtn">
                                            <a

                                                class="tu-primbtn-lg"
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
            {/* <!-- Services Category End --> */}
        </>
    )
}

export default SubjectICanTeach
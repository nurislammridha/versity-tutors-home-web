"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import getCroppedImg from "./cropImage";

const ProfilePhotoModal = ({ show, onClose, onSave, imageSrc }) => {
    const modalRef = useRef(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onSave(croppedImage);
        handleClose();
    };

    const handleClose = () => {
        const modalEl = modalRef.current;
        const modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
        modalInstance?.hide();
        onClose();
        // 🔥 Remove backdrop and modal-open class manually
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();

        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Restore scroll if needed
    };

    useEffect(() => {
        let modal;

        const loadBootstrapAndShow = async () => {
            const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");

            if (modalRef.current) {
                modal = new bootstrap.Modal(modalRef.current);
                modal.show();

                const handleHidden = () => {
                    onClose();

                    // 🔥 Clean up any leftover backdrop or class
                    const backdrop = document.querySelector('.modal-backdrop');
                    if (backdrop) backdrop.remove();
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = '';
                };

                modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

                return () => {
                    modalRef.current?.removeEventListener("hidden.bs.modal", handleHidden);
                };
            }
        };

        if (show) {
            loadBootstrapAndShow();
        }
    }, [show, onClose]);


    // Prevent rendering if show is false
    if (!show) return null;

    // Use portal to render modal at end of body
    return ReactDOM.createPortal(
        <div className="modal fade" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header border-bottom-0 px-4 pt-4">
                        <h5 className="modal-title fw-semibold">Choose profile picture</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body px-4">
                        {imageSrc && (
                            <div style={{ position: "relative", height: 400, width: "100%" }}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropShape="round"
                                    showGrid={false}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                        )}
                    </div>
                    <div className="modal-footer flex-column align-items-stretch gap-3 px-4 pb-4">
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(e, value) => setZoom(value)}
                            aria-label="Zoom"
                            sx={{
                                color: '#000',
                                width: '100%',
                            }}
                        />
                        <div className="d-flex justify-content-between gap-2">
                            <button className="btn btn-outline-secondary w-50" onClick={handleClose}>
                                Cancel
                            </button>
                            <button className="btn btn-primary w-50" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        typeof window !== "undefined" ? document.body : null
    );
};

export default ProfilePhotoModal;

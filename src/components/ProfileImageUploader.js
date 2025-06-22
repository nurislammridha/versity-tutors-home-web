import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react'
import ProfilePhotoModal from './ProfilePhotoModal';

const ProfileImageUploader = () => {
    const { t } = useLanguage()
    const [avatar, setAvatar] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Send to modal
            setModalOpen(true);
        }
    };

    const handleSave = async (croppedImage) => {
        const formData = new FormData();
        formData.append("file", croppedImage);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const imageUrl = URL.createObjectURL(croppedImage); // Preview update
            setAvatar({
                url: imageUrl,
                publicId: croppedImage.name || null,
            });
        }
    };
    return (
        <>
            <div className="tu-asidebox">
                <figure>
                    <img src={avatar ? avatar.url : 'images/profile/img-01.jpg'} alt="image-description" />
                    <figcaption className="tu-uploadimage">
                        <input
                            type="file"
                            id="dropbox"
                            name="dropbox"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="dropbox">
                            <i className="icon icon-camera"></i>
                        </label>
                    </figcaption>
                </figure>
                <div className="tu-uploadinfo text-center">
                    <h6>{t.profilePhotoSize}</h6>
                    <div className="tu-uploadimgbtn">

                        <input type="file" name="file" className="tu-primbtn d-none" id="uploadimg" />
                        <p className='profile-text'>Imran Hossain (TS-114488)</p>
                        <label className='dash-copy'>Copy ID Link<img src='/images/icon.png' /></label>
                        <label className='dash-copy mt-3'>Copy Bio Data Link<img src='/images/icon.png' /></label>
                        {/* <label
                                                    className="tu-primbtn"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => !isAvatarLoading && handleUpload()}
                                                >
                                                    {isAvatarLoading ? t.uploading : t.uploadPhoto}
                                                </label> */}
                    </div>
                </div>
            </div>
            <ProfilePhotoModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                imageSrc={selectedImage}
            />
        </>
    )
}

export default ProfileImageUploader
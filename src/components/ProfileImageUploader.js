import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react'
import ProfilePhotoModal from './ProfilePhotoModal';
import { useDispatch } from 'react-redux';
import { UploadAvatarImg } from '@/redux/_redux/CommonAction';

const ProfileImageUploader = ({ avatar: oldAvatar, clientData }) => {
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const { firstName, lastName, clientId, _id } = clientData || {}
    const [avatar, setAvatar] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [copied, setCopied] = useState(false);
    const [copiedBio, setCopiedBio] = useState(false);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Send to modal
            setModalOpen(true);
        }
    };

    const handleSave = async (croppedImage) => {
        dispatch(UploadAvatarImg(croppedImage, oldAvatar, clientData._id));

        // const formData = new FormData();
        // formData.append("file", croppedImage);

        // const res = await fetch("/api/upload", {
        //     method: "POST",
        //     body: formData,
        // });

        // if (res.ok) {
        //     const imageUrl = URL.createObjectURL(croppedImage); // Preview update
        //     setAvatar({
        //         url: imageUrl,
        //         publicId: croppedImage.name || null,
        //     });
        // }
    };
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(clientId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // revert after 2s
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    const handleCopyBio = async () => {
        try {
            await navigator.clipboard.writeText(`rootUrl/details/${_id}`);
            setCopiedBio(true);
            setTimeout(() => setCopiedBio(false), 2000); // revert after 2s
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    console.log('oldAvatar', oldAvatar)
    return (
        <>
            <div className="tu-asidebox">
                <figure>
                    <img src={oldAvatar ? oldAvatar.url : 'images/profile/img-01.jpg'} alt="image-description" />
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
                        <p className='profile-text'>{firstName + " " + lastName} ({clientId})</p>
                        <label
                            onClick={handleCopy}
                            className={`dash-copy inline-flex items-center gap-2 cursor-pointer transition-all duration-300 ${copied ? 'text-green-600 scale-105' : 'text-black'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy ID Link'}
                            <img src="/images/icon.png" alt="copy icon" className="w-4 h-4" />
                        </label>
                        <label
                            onClick={handleCopyBio}
                            className={`mt-3 dash-copy inline-flex items-center gap-2 cursor-pointer transition-all duration-300 ${copied ? 'text-green-600 scale-105' : 'text-black'
                                }`}
                        >
                            {copiedBio ? 'Copied!' : 'Copy Bio Data Link'}
                            <img src="/images/icon.png" alt="copy icon" className="w-4 h-4" />
                        </label>
                        {/* <label className='dash-copy mt-3'><img src='/images/icon.png' /></label> */}
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
import React, { useState } from 'react';

const Cloudinary = ({ onImageUpload }) => {
    const preset_name = "ChrisGeorge";
    const cloud_name = "dciy2gw7z";

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setImage(file.secure_url);
            setLoading(false);

            if (onImageUpload) {
                onImageUpload(file.secure_url);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                name="file"
                placeholder="Subir una imagen"
                onChange={(e) => uploadImage(e)}
            />
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                image && <img src={image} alt="Imagen subida" style={{ width: "200px", height: "auto" }} />
            )}
        </div>
    );
};

export default Cloudinary;

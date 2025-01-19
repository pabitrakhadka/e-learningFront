import React, { useEffect, useState } from 'react';
import Layout from '@/components/FrontEnd/Layout';
import { getImage } from '@/function/image';
import ImageView from '@/components/ImageView';
import Modal from "@/components/Model";

const Galary = () => {
    const [loading, setIsLoading] = useState(true);
    const [images, setImage] = useState([]);
    const [thisImage, setThisImage] = useState();
    const [showImage, setShowImage] = useState(false);

    const showImageButton = (src, title, date) => {
        setThisImage({ src, title, date });
        setShowImage(true);
    };

    useEffect(() => {
        loadImage();
    }, []);

    const loadImage = async () => {
        setIsLoading(true);
        try {
            const res = await getImage('');
            if (res.status === 200) {
                setImage(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {loading ? (
                    <div>Loading images...</div>
                ) : images.length > 0 ? (
                    images.map((item, index) => (



                        <ImageView
                            key={index}
                            onClick={() => showImageButton(item?.fileUrl, item?.title, item?.createAt)}
                            image={item?.fileUrl}
                        />

                    ))
                ) : (
                    <div>No images available.</div>
                )}
            </div>
            <Modal isOpen={showImage} onClose={() => setShowImage(false)}>
                {thisImage && (
                    <div className=''>
                        {console.log(thisImage)}
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${thisImage?.src}`}
                            alt={thisImage.title}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{thisImage.title}</h2>
                            <p className="text-sm text-gray-500">{thisImage.date}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default Galary;

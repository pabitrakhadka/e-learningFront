import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ButtonComp from '@/components/ButtonComp';
import DashLayout from '@/components/DashLayout';
import FileInputComp from '@/components/FileInputComp';
import InputComp from '@/components/InputComp';
import Modal from '@/components/Model';
import MultipleFileUpload from '@/components/MultipleFileUpload';
import { imagesSchema } from '@/validate';
import { FaImage } from 'react-icons/fa6';
import { CheckBox } from '@mui/icons-material';
import CheckComp from '@/components/CheckComp';
import { deleteImage, getImage, postImage } from '@/function/image';
import { useToast } from '@/Context/TostContext';
import ImageView from '@/components/ImageView';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CiRead } from 'react-icons/ci';

const initialValues = {
    title: '',
};

const Images = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [imageFiles, setImageFiles] = useState(null);
    const [imageData, setImageData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewImage, setViewImage] = useState(null);

    const [viewModeal, setViweModel] = useState(false);

    const openViewModal = () => {
        setViweModel(true);
    }
    const closeViewModal = () => {
        setViweModel(false);
    }
    useEffect(() => {
        loadImages();
    }, [])

    const loadImages = async () => {
        try {
            const res = await getImage("");
            if (res.status === 200) {
                console.log("res.data=", res.data.data);
                setImageData(res?.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        setIsOpenModal(false);
        resetForm();
        setImageFiles(null);

    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(file);
        }
    };

    const { errors, touched, values, setFieldValue, handleBlur, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues,
        validationSchema: imagesSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('title', values.title);

                formData.append('image', imageFiles);
                formData.append("isSlider", isChecked);
                const res = await postImage(formData);

                console.log("response=", res.status);

                if (res.status === 200) {
                    closeModal();
                    showToast(res.status, res?.data.message);
                } else {
                    // showToast(res.status, res?.data.message);

                    console.log("errors");
                }

                // console.log([...formData.entries()]);

            } catch (error) {

                console.error('Error during submission:', error);
            }
        },
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleChangeCheckBox = (e) => {
        setIsChecked(e.target.checked);
    };
    const handleEdit = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }

        try {
            const res = await getImage(`id=${id}`);
            console.log(res);
            if (res?.status === 200) {
                openModal(true);
                setIsEdit(true);
                setEditId(id);

                const data = res?.data?.data;
                setFieldValue("title", data.title);

                setFieldValue("isSlider", data.isSlider);
                setImageFiles(null); // Reset image for editing
            }
        } catch (error) {
            console.error("Error loading category for edit:", error);
            showToast(500, "Internal Server Error.");
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this news?");
        if (confirmDelete) {
            try {
                const res = await deleteImage(`id=${id}`);
                console.log("res=", res);
                if (res?.status === 200) {

                    showToast(res?.status, res?.data.message);
                    setImageData((pre) => pre.filter((item) => item.id !== id));

                } else {
                    showToast(res?.status, res?.data.message);
                }
            } catch (error) {
                console.error("Error deleting news:", error);
                showToast(500, "Internal Server Error.");
            }
        }
    };
    const handleView = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }
        try {
            const res = await getImage(`id=${id}`);
            if (res.status === 200) {
                openViewModal();
                setViewImage(res?.data.data);
                console.log("res=", res.data.data);

            } else {

            }
        } catch (error) {

        }
    }
    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={openModal} name="Upload Image" icon={<FaImage size={25} />} />

                <div>
                    <h1>Images</h1>
                    <div className='shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                        {imageData.length > 0 ? <>
                            {imageData.map((item, index) => (
                                <div>
                                    <ImageView key={index} image={item?.fileUrl} />
                                    <div className=' p-3 flex justify-center items-center gap-8'>
                                        <ButtonComp onClick={() => handleDelete(item?.id)} icon={<FaTrash size={25} />} />
                                        <ButtonComp onClick={() => handleEdit(item?.id)} icon={<FaEdit size={25} />} />
                                        <ButtonComp onClick={() => handleView(item?.id)} icon={<CiRead size={25} />} />
                                    </div>
                                </div>
                            ))}
                        </> : <></>}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpenModal} title="Upload Image" onClose={closeModal}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputComp
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title"
                                label="Title"
                            />
                            {errors.title && touched.title && <p className="text-red-500">{errors.title}</p>}
                        </div>
                        <div>
                            <CheckComp id='isSlider' isChecked={isChecked} label={"IS Slider Image"} onChange={handleChangeCheckBox} name='isSlider' />
                        </div>
                        <div>
                            {imageFiles ? (
                                <div className="image-preview-container flex">

                                    <img

                                        className="w-24 h-16 object-contain p-2"
                                        alt={`Preview  `}
                                        src={URL.createObjectURL(imageFiles)}
                                    />

                                </div>
                            ) : (
                                <MultipleFileUpload
                                    name="image"
                                    onChange={onImageChange}
                                    accept=".png,.jpeg,.jpg"
                                    multiple
                                />
                            )}
                        </div>
                        <div className='flex justify-center items-center m-2'>
                            <ButtonComp name="Submit" type="submit" />
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={viewModeal} title={"View Image"} onClose={closeViewModal} >
                <div>
                    {viewImage ? <>
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${viewImage?.fileUrl}`}
                            alt={"d"}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                    </> : <>

                    </>}
                </div>
            </Modal>
        </DashLayout>
    );
};

export default Images;

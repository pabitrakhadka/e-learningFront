import ButtonComp from '@/components/ButtonComp';
import DashLayout from '@/components/DashLayout';
import React, { useContext, useEffect, useState } from 'react';
import { FaNewspaper } from "react-icons/fa6";
import Modal from '@/components/Model';
import FileInputComp from '@/components/FileInputComp';
import InputComp from '@/components/InputComp';
import TextAreaComp from '@/components/TextAreaComp';
import { getCategory } from '@/function/category';
import SelectOption from '@/components/SelectOption';
import { useFormik } from 'formik';
import { newsSchema } from '@/validate';
import { deleteNews, getNews, postNews, putNews } from '@/function/content';
import AdminAuthContext from '@/Context/AdminAuth';
import { useToast } from '@/Context/TostContext';
import CardNews from '@/components/CardNews';
import { FaTrash } from 'react-icons/fa6';
import { AiFillEdit, AiOutlineFolderView } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { CiRead } from "react-icons/ci";
import CardNewsLoader from '@/components/UILoader/CardNewsLoader ';


const initialValues = {
    title: "",
    description: "",
    category_id: "",
    image: "",
};

const News = () => {
    const { showToast } = useToast();
    const { admin } = useContext(AdminAuthContext);
    const [isloading, setLoading] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [viewNews, setViewNews] = useState([]);

    const [newsModelOpen, setNewsModal] = useState(false);

    const OpenNewsModal = () => {
        setNewsModal(true);

    }
    const CloseNewsModal = () => {
        setNewsModal(false);
    }
    useEffect(() => {
        if (admin?.id) {
            loadCategories();
            loadNews();
        }
    }, [admin?.id]);

    const loadCategories = async () => {
        try {
            const res = await getCategory("");
            if (res?.status === 200) {
                console.log("res.data=", res?.data?.data)
                setCategories(res?.data?.data || []);
            } else {
                console.log(res.status);
                showToast(res?.status, "Failed to load categories.");
            }
        } catch (error) {
            console.error("Error loading categories:", error);
            showToast(500, "Internal Server Error.");
            console.log(error);
        }
    };

    const loadNews = async () => {
        try {
            const res = await getNews("");
            if (res?.status === 200) {
                setNewsList(res?.data?.data || []);
                console.log(res.data.data);
                setLoading(false);
            } else {
                showToast(res?.status, "Failed to load categories.");
            }
        } catch (error) {
            console.error("Error loading categories:", error);
            showToast(500, "Internal Server Error.");
        }
    };
    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        resetForm();
        setIsEdit(false);
        setEditId(null);
        setImageFile(null);
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
        }
    };

    const handleEdit = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }

        try {
            const res = await getNews(`id=${id}`);
            console.log(res);
            if (res?.status === 200) {
                setIsOpenModal(true);
                setIsEdit(true);
                setEditId(id);

                const data = res?.data?.data;
                setFieldValue("title", data.title);
                setFieldValue("description", data.description);
                setFieldValue("category_id", data.category_id);
                setImageFile(null); // Reset image for editing
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
                const res = await deleteNews(`id=${id}`);
                console.log("res=", res);
                if (res?.status === 200) {

                    showToast(res?.status, res?.data.message);
                    setNewsList((pre) => pre.filter((item) => item.id !== id));

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
            const res = await getNews(`id=${id}`);
            if (res.status === 200) {
                OpenNewsModal();
                setViewNews(res?.data.data);
                console.log("res=", res.data.data);

            } else {

            }
        } catch (error) {

        }
    }

    const { errors, values, touched, handleBlur, handleChange, resetForm, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: newsSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('category_id', parseInt(values.category_id, 10));
                formData.append("created_by", parseInt(admin?.id, 10));
                // Check if the file is valid before appending
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                console.log([...formData.entries()]); // Debug to ensure FormData content is correct

                const res = isEdit && editId
                    ? await putNews(`id=${editId}`, formData)
                    : await postNews(formData);
                // console.log("response=", res);
                if (res.status === 201) {
                    console.log(res?.status);
                    console.log(res?.data.message);
                    showToast(res.status, res.data.message);
                    closeModal();
                } else {
                    closeModal();
                    showToast(res?.status, res?.data?.message);
                }
            } catch (error) {
                console.error("Error submitting news:", error);
                showToast(500, "Internal Server Error.");
            }
        }
    });

    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={openModal} name="Add News" icon={<FaNewspaper size={30} />} />
                {/* <CardNewsLoader isNews={true} isUserNews={true} /> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {newsList.length > 0 ? (
                        newsList.map((item, index) => (
                            isloading ? <>

                                <CardNewsLoader />
                            </> : <><div className='shadow-md p-5'>
                                <CardNews

                                    image={item?.file_url}
                                    key={index}
                                    isNews={true}
                                    isUserNews={false}
                                    cardTitle={item?.title}
                                    description={item?.description}


                                />
                                <div className='flex justify-center items-center gap-8'>
                                    <ButtonComp onClick={() => handleDelete(item?.id)} icon={<FaTrash size={25} />} />
                                    <ButtonComp onClick={() => handleEdit(item?.id)} icon={<FaEdit size={25} />} />
                                    <ButtonComp onClick={() => handleView(item?.id)} icon={<CiRead size={25} />} />
                                </div>
                            </div></>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full">No news available</p>
                    )}
                </div>
            </div>
            <Modal onClose={closeModal} isOpen={isOpenModal} title={isEdit ? "Edit News" : "Add News"}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <InputComp label="Title" name="title" onBlur={handleBlur} onChange={handleChange} value={values.title} />
                    {errors.title && touched.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                    <TextAreaComp name="description" onBlur={handleBlur} onChange={handleChange} value={values.description} cols={5} rows={5} label="Description" />
                    {errors.description && touched.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

                    <SelectOption name="category_id" onBlur={handleBlur} onChange={handleChange} value={values.category_id} options={categories} />
                    {errors.category_id && touched.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}

                    <div>
                        {imageFile ? (
                            <img className="w-full h-48 object-contain p-2" alt="Preview" src={URL.createObjectURL(imageFile)} />
                        ) : (
                            <FileInputComp name={'image'} onChange={onImageChange} accept=".png,.jpeg,.jpg" />
                        )}
                    </div>

                    <ButtonComp type="submit" name={isEdit ? "Update" : "Create"} />
                </form>
            </Modal>
            <Modal
                isOpen={newsModelOpen}
                title={viewNews ? viewNews?.title : 'Title'}
                onClose={CloseNewsModal}
            >
                <div className="p-5 max-h-[80vh] overflow-y-auto">
                    {viewNews ? (
                        <>
                            <img
                                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${viewNews?.file_url}`}
                                alt="Card Image"
                            />
                            <h1 className="text-xl font-semibold text-gray-800 mt-3">
                                {viewNews?.title}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {viewNews?.description}
                            </p>
                        </>
                    ) : (
                        <p>Something Went Wrong</p>
                    )}
                </div>
            </Modal>

        </DashLayout>
    );
};

export default News;

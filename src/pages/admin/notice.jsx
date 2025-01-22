import React, { useEffect, useState } from 'react'
import DashLayout from '@/components/DashLayout'
import { deleteNotice, getNotice, postNotice, putNotice } from '@/function/notice';
import ButtonComp from '@/components/ButtonComp';
import Modal from '@/components/Model';
import { noticeSchema } from '@/validate';
import TextAreaComp from '@/components/TextAreaComp';
import { useFormik } from 'formik';
import InputComp from '@/components/InputComp';
import { useToast } from '@/Context/TostContext';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/TableComp';
import NepaliDateConverter from '@/utills/nepaliDate';
import { AiFillEdit, AiFillRead } from 'react-icons/ai';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import PDFInput from '@/components/PDFInput';
import TableLoader from '@/components/UILoader/TableLoader';
const initialValues = {
    title: "",
    content: "",
    pdf: ""

}
const notice = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [notices, setNotices] = useState([]);
    const [isEdit, setEdit] = useState();
    const [editID, setEditId] = useState();
    const [isview, setIsview] = useState(false);
    const [viewNotices, setViewNotices] = useState({ // Initialize viewNotices
        title: '',
        content: '',
        date: '',
        url: ""
    });
    const [isloading, setLoading] = useState(true);
    const { showToast } = useToast();
    const OpenModel = () => {
        setIsOpenModal(true);
    }
    const closeModal = () => {
        setIsOpenModal(false);
        resetForm();
        setIsview(false);
        setEdit(false);
        setEditId();
        setViewNotices(null);

    }

    useEffect(() => {

        loadNotice();
    }, [])


    const loadNotice = async () => {
        try {
            const res = await getNotice("");
            if (res?.status === 200) {
                setNotices(res?.data?.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }

        try {
            const res = await getNotice(`id=${id}`);
            console.log(res);
            if (res?.status === 200) {
                OpenModel(true);
                setEdit(true);
                setEditId(id);

                const data = res?.data?.data;
                setFieldValue("title", data.title);
                // setIsChecked(data.isSlider);
                setFieldValue("content", data.content);
                // setImageFiles(`${process.env.NEXT_PUBLIC_IMAGE_URL$}/${data.fileUrl}`);
                // setImageFiles(null); // Reset image for editing
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
                const res = await deleteNotice(`id=${id}`);
                console.log("res=", res);
                if (res?.status === 200) {

                    showToast(res?.status, res?.data.message);
                    setNotices((pre) => pre.filter((item) => item.id !== id));

                } else {
                    showToast(res?.status, res?.data.error);
                }
            } catch (error) {
                console.error("Error deleting news:", error);
                showToast(500, "Internal Server Error.");
            }
        }
    };

    const handleView = async (title, content, date, url) => {
        console.log("title content and data", title, content, date);
        if (!title && !content && !date) {
            showToast(400, 'Something went Wrong');
        } else {
            OpenModel();
            setIsview(true)
            setViewNotices((prev) => ({
                ...prev, // Retain existing properties
                title: title,
                content: content,
                date: date,
                url: url
            }));
        }
    }
    const { errors, values, touched, handleSubmit, handleBlur, resetForm, setFieldValue, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: noticeSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("content", values.content);
                formData.append("pdf", values.pdf);


                const res = isEdit && editID ? await putNotice(`id=${editID}`, formData) : await postNotice(formData);
                console.log("response=", res);
                if (res?.status === 200) {
                    closeModal();
                    // console.log(values);
                    console.log("res data=", res?.data);
                    showToast(res?.status, res?.data?.message);
                } else {
                    showToast(res?.status, res?.data?.error);

                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={OpenModel} name={"Add Notice"} />

                <div>

                    <h1>Notices</h1>

                    {isloading ? <>
                        <TableLoader />
                    </> : <><Table>
                        <Thead>
                            <Th>S.N</Th>
                            <Th>Title</Th>
                            <Th>Content</Th>
                            <Th>Pdf File</Th>

                            <Th>Date</Th>
                            <Th colSpan={"3"}>Action</Th>

                        </Thead>
                        <Tbody>
                            {notices.length > 0 ? <>
                                {notices.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item?.title}</Td>
                                        <Td>{item?.content}</Td>
                                        <Td>{item?.fileUrl}</Td>

                                        <Td>{NepaliDateConverter(item?.createdAt)}</Td>
                                        <Td >
                                            <ButtonComp onClick={() => handleEdit(item?.id)} name={"Edit"} icon={<AiFillEdit size={25} />} />
                                        </Td>
                                        <Td >
                                            <ButtonComp isPositive={false} onClick={() => handleDelete(item?.id)} name={"delete"} icon={<FaTrashAlt size={25} />} />
                                        </Td>
                                        <Td><ButtonComp onClick={() => handleView(item?.title, item?.content, item?.createdAt, item?.fileUrl)} name={"View"} icon={<AiFillRead size={25} />} /></Td>
                                    </Tr>
                                ))}
                            </> : <>
                            </>}
                        </Tbody>
                    </Table></>}
                </div>
            </div>
            <Modal isOpen={isOpenModal} onClose={closeModal}>
                {isview && viewNotices ? <>
                    <div className="p-6 bg-gray-100 h-auto flex justify-center items-center">
                        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-gray-200 pb-2">
                                Title: <span className="text-black">{viewNotices.title}</span>
                            </h1>
                            <p className="text-sm text-gray-500 mb-4">
                                Date: <span className="text-gray-800">{NepaliDateConverter(viewNotices.date)}</span>
                            </p>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Content: <span className="text-gray-900">{viewNotices.content}</span>
                            </p>
                            <div className='h-56 overflow-hidden overflow-y-scroll'>
                                <iframe
                                    src={`${process.env.NEXT_PUBLIC_PDF}/${viewNotices.url}`}

                                    className="w-full h-[80vh] border rounded-md"
                                    style={{
                                        maxWidth: '100%',

                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </> : <><form onSubmit={handleSubmit}>
                    <div>
                        <InputComp name={'title'} value={values.title} onChange={handleChange} onBlur={handleBlur} label={"Title"} />
                        {errors.title && touched.title ? (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        ) : null}
                    </div>
                    <div>
                        <TextAreaComp name={'content'} value={values.content} onChange={handleChange} onBlur={handleBlur} label={"Content"} />
                        {errors.content && touched.content ? <>
                            <p className='text-red-500'>{errors.content}</p>
                        </> : <></>}
                    </div>
                    <div>
                        <PDFInput
                            name={'pdf'}
                            accept={'.pdf'}
                            onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                if (file) {
                                    setFieldValue("pdf", file);
                                }
                            }}
                        />
                        {errors.pdf && touched.pdf && (
                            <p className="text-red-500 text-sm">{errors.pdf}</p>
                        )}
                    </div>
                    <div>
                        <ButtonComp name={"Submit"} type='submit' />
                    </div>
                </form></>}
            </Modal>
        </DashLayout>
    )
}

export default notice
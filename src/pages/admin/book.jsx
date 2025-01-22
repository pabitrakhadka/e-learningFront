import ButtonComp from '@/components/ButtonComp'
import DashLayout from '@/components/DashLayout'
import FileInputComp from '@/components/FileInputComp';
import InputComp from '@/components/InputComp';
import Modal from '@/components/Model';
import PDFInput from '@/components/PDFInput';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/TableComp';
import { useToast } from '@/Context/TostContext';
import { deleteBook, getBook, postBook } from '@/function/books';
import { ebookSchema } from '@/validate';
import { useFormik } from 'formik';
import { FaTrash } from "react-icons/fa6";
import { AiFillEdit, AiFillRead } from "react-icons/ai";
import PdfViewer from '@/components/PdfViewer';

import React, { useEffect, useState } from 'react'
import NepaliDateConverter from '@/utills/nepaliDate';
import TableLoader from '@/components/UILoader/TableLoader';
const initialValues = {
    title: "",
    description: "",
    pdf: null,
    author: "",
}
const book = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [isEdit, setEdit] = useState();
    const [isLoading, setLoading] = useState(true);
    const [editID, setEditId] = useState();
    const [viewPdfUrl, setViewPdfUrl] = useState(null); // State to store PDF URL for viewing

    const { showToast } = useToast();
    const OpenModel = () => {
        setIsOpenModal(true);
    }
    const closeModal = () => {
        resetForm();
        setIsOpenModal(false);
        setViewPdfUrl(null); // Reset PDF URL when closing modal
    }

    const loadBooks = async () => {
        try {
            const res = await getBook("");
            if (res.status === 200) {
                setBooks(res?.data?.data);
                console.log(res?.data?.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        loadBooks();

    }, [])

    const handleEdit = async (id) => {
        if (!id) {
            showToast(400, "ID is missing.");
            return;
        }

        try {
            const res = await getImage(`id=${id}`);
            console.log(res);
            if (res?.status === 200) {
                // openModal(true);
                // setIsEdit(true);
                setEditId(id);

                const data = res?.data?.data;
                setFieldValue("title", data.title);
                setIsChecked(data.isSlider);
                setFieldValue("isSlider", data.isSlider);
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

        } else {
            const confirmDelete = confirm("Are you sure you want to delete this news?");
            if (confirmDelete) {
                try {
                    const res = await deleteBook(`id=${id}`);
                    console.log("res=", res);
                    if (res?.status === 200) {

                        showToast(res?.status, res?.data.message);
                        setBooks((pre) => pre.filter((item) => item.id !== id));

                    } else {
                        showToast(res?.status || 400, res?.error || "Something Went Wrong!");
                    }
                } catch (error) {
                    console.error("Error deleting news:", error);
                    showToast(500, "Internal Server Error.");
                }
            }
        }


    };

    const handleView = (fileUrl, title) => {
        console.log("file url", fileUrl);
        console.log("", process.env.NEXT_PUBLIC_PDF)

        setViewPdfUrl({
            fileUrl: fileUrl,
            title: title
        });
        setIsOpenModal(true);
        console.log(viewPdfUrl)
    };

    const { errors, values, touched, setFieldValue, handleSubmit, handleBlur, resetForm, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: ebookSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("author", values.author);
                formData.append('pdf', values.pdf);


                // console.log(values);
                const res = isEdit && id ? await putBook(`id=${id}`, values) : await postBook(values);
                if (res?.status === 201) {
                    console.log("res data=", res?.data);
                    showToast(res?.status, res?.data?.message);
                    closeModal();
                } else {
                    showToast(res?.status, res?.data?.message);
                    closeModal();


                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={OpenModel} name={"Add Book"} />

                <h1>Books</h1>

                <div>
                    {isLoading ? <>

                        <TableLoader />
                    </> : <>    <Table>
                        <Thead>
                            <Th>
                                S.N
                            </Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>Author</Th>
                            <Th>File</Th>
                            <Th>Date</Th>
                            <Th colSpan={"3"} >Action</Th>


                        </Thead>

                        <Tbody>
                            {books.length > 0 ? <>
                                {books.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item?.title}</Td>
                                        <Td>{item?.description}</Td>
                                        <Td>{item?.author}</Td>
                                        <Td>{item?.fileUrl}</Td>
                                        <Td>{NepaliDateConverter(item?.createdAt)}</Td>
                                        <Td >
                                            <ButtonComp onClick={() => handleEdit(item?.id)} name={"Edit"} icon={<AiFillEdit size={25} />} />
                                        </Td>
                                        <Td >
                                            <ButtonComp onClick={() => handleDelete(item?.id)} name={"delete"} icon={<FaTrash size={25} />} />
                                        </Td>
                                        <Td><ButtonComp onClick={() => handleView(item?.fileUrl, item?.title)} name={"View"} icon={<AiFillRead size={25} />} /></Td>

                                    </Tr>
                                ))}
                            </> : <></>}
                        </Tbody>
                    </Table></>}
                </div>
            </div>
            <Modal isOpen={isOpenModal} title={viewPdfUrl ? `View PDF || ${viewPdfUrl?.title} ` : "Add Book"} onClose={closeModal}>
                {viewPdfUrl ? (
                    <div className="flex justify-center items-center">
                        <iframe
                            src={`${process.env.NEXT_PUBLIC_PDF}/${viewPdfUrl?.fileUrl}`}
                            title='test'
                            className="w-full h-[80vh] border rounded-md"
                            style={{
                                maxWidth: '100%',
                            }}
                        />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputComp name={'title'} value={values.title} onChange={handleChange} onBlur={handleBlur} label={"Title"} />
                            {errors.title && touched.title ? (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            ) : null}
                        </div>
                        <div>
                            <InputComp name={'author'} value={values.author} onChange={handleChange} onBlur={handleBlur} label={"Author"} />
                            {errors.author && touched.author ? (
                                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                            ) : null}
                        </div>
                        <div>
                            <InputComp name={'description'} value={values.description} onChange={handleChange} onBlur={handleBlur} label={"Description"} />
                            {errors.description && touched.description ? (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            ) : null}
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
                            <ButtonComp loadingText='Submitting' name={"Submit"} type={"submit"} />
                        </div>
                    </form>
                )}
            </Modal>
        </DashLayout>
    )
}

export default book
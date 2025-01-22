import ButtonComp from '@/components/ButtonComp'
import DashLayout from '@/components/DashLayout'
import InputComp from '@/components/InputComp'
import Modal from '@/components/Model'
import { useToast } from '@/Context/TostContext'
import { getNews, postNews } from '@/function/content'
import { categorySchema } from '@/validate'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FaCaretRight } from "react-icons/fa6"
import dynamic from 'next/dynamic'
import { deleteCategory, getCategory, postCategory, putCategory } from '@/function/category'
// import { Table } from '@mui/material'
import { Table, Td, Thead, Tr } from '@/components/TableComp'
import { FaTrash } from 'react-icons/fa6'
import { FaEdit } from "react-icons/fa";
import TableLoader from '@/components/UILoader/TableLoader'
const initialValues = {
    name: "",
    description: ""
};
const category = () => {
    const Loders = dynamic(() => import("@/components/Loders"), { ssr: false });
    const { showToast } = useToast();
    const [category, setcategory] = useState([]);
    const [isOpenModal, setIsOpenModel] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);

    const [id, setId] = useState();

    useEffect(() => {
        loadCategory();
    }, [])
    const handleDelete = async (id) => {
        if (!id) {
            showToast(400, "Id Is Missing..");
            return;
        }
        const result = confirm("Are Your Sure to Delte This Category?");
        if (result) {
            try {

                const res = await deleteCategory(`id=${id}`);
                if (res?.status === 200) {
                    // Remove the category from the local state
                    setcategory((prev) => prev.filter((item) => item.id !== id));
                    showToast(res?.status, res?.data.message);
                } else {
                    showToast(res?.status, res?.data.message);

                }
            } catch (error) {
                console.log(error);
            }
        }


    }
    const handleEdit = async (id) => {
        if (!id) {
            showToast(400, "Id Is Missing..");
            return;
        } else {
            try {
                const res = await getCategory(`id=${id}`);
                if (res?.status === 200) {
                    setIsOpenModel(true);
                    setIsEdit(true);
                    setId(id);

                    const data = res?.data?.data;
                    values.name = data.name;
                    values.description = data.description;
                }
            } catch (error) {
                console.log(error);
            }
        }


    }

    const loadCategory = async () => {
        try {
            const res = await getCategory("");
            if (res?.status === 200) {
                setIsloading(false);
                console.log(res?.data?.data);
                setcategory(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    }



    const { errors, values, touched, handleSubmit, handleBlur, resetForm, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: categorySchema,
        onSubmit: async (values) => {
            try {
                closeModal();
                console.log(values);
                const res = isEdit && id ? await putCategory(`id=${id}`, values) : await postCategory(values);
                if (res?.status === 201) {
                    console.log("res data=", res?.data);
                    showToast(res?.status, res?.data?.message);
                } else {
                    showToast(res?.status, res?.data?.message);

                }
            } catch (error) {
                console.log(error);
            }
        }
    })
    const openModal = () => {
        setIsOpenModel(true);
    }

    const closeModal = () => {
        setIsOpenModel(false);
        resetForm();
    }


    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={openModal} name={'Add Category'} icon={<FaCaretRight size={30} />} />


                <div>
                    <h1>Categoryies</h1>

                    {isLoading ? <>
                        <div>
                            <Loders />
                        </div>
                    </> : <>
                        {isLoading ? <>
                            <TableLoader />
                        </> : <>
                            <Table>
                                <Thead>
                                    <Td>S.N</Td>
                                    <Td>Name</Td>
                                    <Td>Description</Td>

                                    <Td>
                                        Created Date
                                    </Td>
                                    <Td colspan={2}>Actions</Td>
                                </Thead>

                                {
                                    category.length > 0 ? <>
                                        {
                                            category.map((item, index) => (

                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{item?.name}</Td>
                                                    <Td>{item?.description}</Td>

                                                    <Td>{item?.created_at}</Td>
                                                    <Td >
                                                        <ButtonComp onClick={() => handleDelete(item?.id)} icon={<FaTrash color='white' size={30} />} />
                                                    </Td>
                                                    <Td >
                                                        <ButtonComp onClick={() => handleEdit(item?.id)} icon={<FaEdit size={30} />} />
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </> : <>
                                        <p>Category is not Fouond</p>
                                    </>
                                }
                            </Table></>}
                    </>}
                </div>
            </div>
            <div>
                <Modal isOpen={isOpenModal} onClose={closeModal} title={"Add Category"} >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputComp name={'name'} value={values.name} onChange={handleChange} onBlur={handleBlur} label={"Name"} />
                            {errors.name && touched.name ? (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            ) : null}
                        </div>
                        <div>
                            <InputComp name={'description'} value={values.description} onChange={handleChange} onBlur={handleBlur} label={"Descrption"} />
                            {errors.description && touched.description ? <>
                                <p className='text-red-500'>{errors.description}</p>
                            </> : <></>}
                        </div>
                        <div>
                            <ButtonComp name={isEdit ? "Update" : "Create"} type={'submit'} />
                        </div>
                    </form>

                </Modal>
            </div>
        </DashLayout>
    )
}

export default category
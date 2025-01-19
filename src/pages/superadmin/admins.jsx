import React from 'react'
import SuperAdminLayout from "@/Components/SuperAdminLayout";
import { useState } from 'react';
import { useEffect } from 'react';
import { postAdmin, getAdmin, putAdmin, deleteAdmin } from '@/function/admin';
import { Table, Tbody, Td, Thead, Tr } from '@/Components/TableComp';
import ButtonComp from '@/Components/ButtonComp';
import { AiFillDelete, AiFillEdit, } from 'react-icons/ai'
import { FaUserClock } from "react-icons/fa6";
import Modal from '@/Components/Model';
import { registerSchama } from '@/validate';
import { useFormik } from 'formik';
import InputComp from '@/Components/InputComp';
import { useToast } from '@/Context/TostContext';
import { useRouter } from 'next/router';
import { capitalName } from '@/utills/fullName';


const initialValues = {
    name: "",
    email: "",
    address: "",
    password: "",
    confirm_password: ""
};



// import SuperAdminLayout from "@/Components/SuperAdminLayout";
const admins = () => {

    const [isid, setIsId] = useState();
    const [isEdit, setEdit] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();
    const [openModal, setOpenModel] = useState(false);

    // const openModal
    const OpenModelButton = () => {
        setOpenModel(true);
    }
    const CloseModel = () => {
        setOpenModel(false);
    }
    const [admin, setAdmin] = useState([]);
    const [loading, setloading] = useState(true);


    const handelDelete = async (id) => {

        const result = confirm("Are Your Sure to Delete Admin");
        if (result) {

            if (!id) {
                showToast(400, "ID is Missing");
            }
            try {
                setAdmin((prevAdmin) => prevAdmin.filter((item) => item.id !== id));
                // console.log("id=", id);
                const res = await deleteAdmin(`id=${id}`);

                if (res?.status === 200) {
                    //filter to remove id
                    showToast(res?.status, res?.data.message);

                    router.push("/superadmin/admins");
                } else {
                    showToast(res?.status, res?.data?.message);
                }

            } catch (error) {
                console.log(error);
            }
        }

    }

    const getAdminbyId = async (id) => {
        if (!id) {
            showToast(400, "Id is Missing!");

        }
        try {
            const res = await getAdmin(`id=${id}`);
            if (res?.status === 200) {
                setEdit(true);
                setIsId(id);
                console.log(res?.data);
                const data = res.data.data;
                values.name = data.name;
                values.address = data.address;
                values.email = data.email;

                // values.
                setOpenModel(true);

            } else {
                showToast(res?.status, res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            showToast(500, "Internal Server Error");
        }

    }
    useEffect(() => {

        loadAdmins();
    }, [])
    const loadAdmins = async () => {
        try {
            const res = await getAdmin("");
            if (res?.status === 200) {
                console.log(res.data);
                setAdmin(res?.data?.data)
                setloading(false);
            }
        } catch (error) {

        }
    }

    const { values, errors, touched, resetForm, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchama,  // Correct this to validationSchema
        onSubmit: async (values) => {
            try {
                console.log(values);
                const res = isEdit ? await putAdmin(`id=${isid}`, values) : await postAdmin(values);
                if (res.status === 201) {
                    showToast(res?.status, res?.data?.message || "Register Successful");

                    router.push("/superadmin/admins");
                    CloseModel();
                    resetForm();
                } else {
                    showToast(res?.status, res?.data?.message);
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 409) {
                        showToast(error.response.status, error.response.data.message || "User already exists!");
                        // router.push("/login");
                    } else if (error.response.status === 422) {
                        showToast(error.response.status, error.response.data.message || "Validation Error");
                    } else {
                        showToast(error.response.status, error.response.data.message || "An error occurred");
                    }
                } else {
                    showToast(500, "Server Error");
                }
            }
        }


    });
    return (
        <SuperAdminLayout>
            <div>
                <h1>Admins</h1>
                <div>
                    <ButtonComp onClick={OpenModelButton} icon={<FaUserClock size={30} color='blue' />} />
                </div>

                <div>
                    <Modal isOpen={openModal} onClose={CloseModel} title={"Add Admin"}>
                        <div>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className="">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">Enter Name</label>
                                        <InputComp
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}  // Correct this from handleBlur
                                            value={values.name}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                        />
                                        {errors.name && touched.name ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        ) : null}
                                    </div>



                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
                                    <InputComp
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}  // Correct this from handleBlur
                                        value={values.email}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                    />
                                    {errors.email && touched.email ? (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Address</label>
                                    <InputComp
                                        type="text"
                                        name="address"
                                        id="address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}  // Correct this from handleBlur
                                        value={values.address}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                                    />
                                    {errors.address && touched.address ? (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    ) : null}
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Password</label>
                                        <InputComp
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}  // Correct this from handleBlur
                                            value={values.password}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                                        />
                                        {errors.password && touched.password ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Confirm_password</label>
                                        <InputComp
                                            type="password"
                                            name="confirm_password"
                                            id="confirm_password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}  // Correct this from handleBlur
                                            value={values.confirm_password}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                                        />
                                        {errors.confirm_password && touched.confirm_password ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className='flex justify-center mt-6'>
                                    <ButtonComp
                                        type="submit"
                                        name={isEdit ? "Update " : "Register"}
                                        className=""
                                    />
                                </div>

                            </form>
                        </div>
                    </Modal>
                </div>
                <div>
                    <Table>
                        <Thead>
                            <Td> Name</Td>

                            <Td>Email</Td>
                            <Td>Address</Td>
                            <Td>Role</Td>

                            <Td>Date Created</Td>
                            <Td>Action</Td>
                        </Thead>
                        <Tbody>
                            {loading ? <></> : <>


                                {admin && admin.length >= 0 ? <>
                                    {admin.map((item) => (
                                        <Tr key={item?.id}>
                                            <Td >{capitalName(item?.name)}</Td>

                                            <Td >{item?.email}</Td>
                                            <Td >{capitalName(item?.address)}</Td>
                                            <Td >{item?.role}</Td>
                                            <Td >{item?.createdAt}</Td>
                                            <Td colspan={2} >
                                                <ButtonComp onClick={() => handelDelete(item?.id)} className='bg-black m-2' icon={<AiFillDelete size={30} />} />
                                                <ButtonComp onClick={() => getAdminbyId(item?.id)} isPositive={false} icon={<AiFillEdit size={30} color='red' />} />
                                            </Td>

                                        </Tr>
                                    ))}
                                </> : <></>}
                            </>}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </SuperAdminLayout>
    )
}

export default admins
import ButtonComp from '@/Components/ButtonComp';
import InputComp from '@/Components/InputComp';
import AdminAuthContext from '@/Context/AdminAuth';
import SuperAdminAuthContext from '@/Context/SuperAdminAuth';
import { useToast } from '@/Context/TostContext';
import { superAdminLogin } from '@/function/logout';
import { postSuperAdmin } from '@/function/superadmin';
import { loginSchema } from '@/validate';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useContext } from 'react';
const initialValues = {
    email: "",
    password: ""
}
const login = () => {
    const { showToast } = useToast();
    const router = useRouter();
    const { login } = useContext(SuperAdminAuthContext);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,  // Correct this to validationSchema
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log(values)
                console.log(process.env.REGISTER_CODE)

                const res = await superAdminLogin(`code=MAATADHALE4534KJKSF`, values);
                if (res.status === 200) {
                    console.log(res.data);
                    showToast(res?.data, res.data.message);
                    login(res.data.data);
                    console.log(res.data);
                    setTimeout(() => {
                        router.push('/superadmin');
                    }, 1000);
                } else {
                    showToast(res.status, res?.data?.message);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                showToast(500, "Internal Server Error");
            } finally {
                setSubmitting(false);  // Ensure form submission state is reset after handling.
            }
        }

    });

    return (

        <div className='flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-teal-400'>
            <div className="w-96 p-8 rounded-lg bg-white shadow-lg">
                <h1 className='text-center text-2xl font-bold mb-6 text-gray-700'>Login</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <InputComp
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        />
                        {errors.email && touched.email ? (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <InputComp
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        />
                        {errors.password && touched.password ? (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        ) : null}
                    </div>

                    <div className='flex justify-center mt-6'>
                        <ButtonComp
                            name='Login'
                            className="w-full bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                        />

                    </div>

                </form>
            </div>
        </div>


    );
};

export default login;

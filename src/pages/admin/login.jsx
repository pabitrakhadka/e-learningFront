import ButtonComp from '@/Components/ButtonComp';
import InputComp from '@/Components/InputComp';
import AdminAuthContext from '@/Context/AdminAuth';
import { useToast } from '@/Context/TostContext';
import { adminiLogin } from '@/function/logout';

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
    const { login } = useContext(AdminAuthContext);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,  // Correct this to validationSchema
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log(values)
                const res = await adminiLogin(values);

                console.log("logn  ddata", res?.data?.data);
                if (res.status === 200 && res?.data?.data?.role === "admin") {
                    console.log("user datad", res.data.data);
                    showToast(res?.data, res.data.message);
                    login(res.data.data);
                    setTimeout(() => {
                        router.push('/admin');
                    }, 1000);
                } else {
                    showToast(res?.status, res?.data?.message);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                showToast(500, "Internal Server Error");
            } finally {
                setSubmitting(false);
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

                    <div className='flex justify-center items-center mt-6 text-center'>
                        <ButtonComp type='submit' defaultText={"Login"} loadingText='Login....'
                            name='Login'
                            className=" text-center w-full bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                        />

                    </div>

                </form>
            </div>
        </div>


    );
};

export default login;

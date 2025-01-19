import ButtonComp from '@/Components/ButtonComp';
import InputComp from '@/Components/InputComp';
import { useToast } from '@/Context/TostContext';
import { postUser } from '@/function/user';
import { registerSchama, registerSchema } from '@/validate';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// Initial form values
const initialValues = {
    name: '',
    email: '',
    address: '',
    password: '',
    confirm_password: '',
};

const Register = () => {
    const { showToast } = useToast();
    const router = useRouter();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: registerSchama, // Ensure `registerSchema` is defined correctly
        onSubmit: async (values) => {
            try {
                const res = await postUser(values);
                if (res.status === 409) {
                    showToast(res?.status, 'User already exists!');
                    router.push('/login');
                }
                // Ensure `postUser` is correctly implemented
                if (res.status === 201) {
                    showToast(res?.status, res?.data?.message || 'Register Successful');
                    router.push('/login');
                } else {
                    showToast(res?.status, res?.data?.message || 'Registration Failed');
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data.message || 'An error occurred';
                    if (status === 409) {
                        showToast(status, 'User already exists!');
                        router.push('/login');
                    } else if (status === 422) {
                        showToast(status, 'Validation Error');
                    } else {
                        showToast(status, message);
                    }
                } else {
                    showToast(500, 'Server Error');
                }
            }
        },
    });

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="w-96 p-8 rounded-lg bg-white shadow-lg">
                <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <InputComp
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        />
                        {errors.name && touched.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <InputComp
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        />
                        {errors.email && touched.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                            Address
                        </label>
                        <InputComp
                            type="text"
                            name="address"
                            id="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.address && touched.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* Password and Confirm Password */}
                    <div className="flex gap-2">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <InputComp
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm_password">
                                Confirm Password
                            </label>
                            <InputComp
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm_password}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.confirm_password && touched.confirm_password && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <ButtonComp type="submit" name="Register" className="" />
                    </div>

                    {/* Login Link */}
                    <div className="flex justify-center">
                        <Link className="text-center text-blue-600" href="/login">
                            Login?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

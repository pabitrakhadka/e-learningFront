import React from 'react';
import Layout from '@/components/FrontEnd/Layout';
import InputComp from '@/components/InputComp';
import TextAreaComp from '@/components/TextAreaComp';
import ButtonComp from '@/components/ButtonComp';
import { useFormik } from 'formik';
import { contactSchema } from '@/validate';
import { postContact } from '@/function/contact';
import { useToast } from '@/Context/TostContext';

const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: ""
};

const Contact = () => {
    const { showToast } = useToast();
    const { values, handleBlur, handleChange, errors, touched, handleReset, handleSubmit, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: contactSchema,
        onSubmit: async (isvalues) => {
            try {
                const res = await postContact(values);
                if (res.status === 201) {
                    showToast(res?.status, res?.data.message);
                } else {
                    showToast(res?.status, res?.data.message);
                }
            } catch (error) {
                showToast(500, error);
            }
        }
    });

    return (
        <Layout>
            <div className="flex flex-col-reverse md:flex-row gap-6 p-5">
                {/* Form Section */}
                <div className="p-4 md:p-6 w-full md:w-1/2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <InputComp onBlur={handleBlur} onChange={handleChange} value={values.name} name={"name"} label={"नाम"} />
                            {errors.name && touched.name && <p className="text-red-600">{errors?.name}</p>}
                        </div>
                        <div className="mb-4">
                            <InputComp name={'email'} onBlur={handleBlur} onChange={handleChange} value={values.email} label={"ईमेल"} />
                            {errors.email && touched.email && <p className="text-red-600">{errors?.email}</p>}
                        </div>
                        <div className="mb-4">
                            <InputComp name={'subject'} onBlur={handleBlur} onChange={handleChange} value={values.subject} label={"विषय"} />
                            {errors.subject && touched.subject && <p className="text-red-600">{errors?.subject}</p>}
                        </div>
                        <div className="mb-4">
                            <TextAreaComp name={"message"} onBlur={handleBlur} onChange={handleChange} value={values.message} cols={5} rows={5} label="सन्देश" />
                            {errors.message && touched.message && <p className="text-red-600">{errors?.message}</p>}
                        </div>
                        <div>
                            <ButtonComp type={'submit'} name={"पठाउनुहाेस"} />
                        </div>
                    </form>
                </div>

                {/* Map and Image Section */}
                <div className="w-full md:w-1/2 md:p-6 flex flex-col gap-4 p-5">
                    <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/contact.jpg`}
                        alt="Contact"
                        className="w-full h-auto object-cover rounded-md"
                    />
                    <div className="w-full h-64 md:h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101826.66577005298!2d82.00649761886983!3d28.19769467145857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39981bb23cfef59b%3A0x69190776242fdd9!2sPurandhara!5e1!3m2!1sen!2snp!4v1737284791793!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;

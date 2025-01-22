import React, { useEffect, useState } from 'react';
import Layout from '@/components/FrontEnd/Layout';
import { getNotice } from '@/function/notice';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [isloading, setLoading] = useState(true);

    useEffect(() => {
        loadNotice();
    }, []);

    const loadNotice = async () => {
        try {
            const res = await getNotice("");
            if (res.status === 200) {
                setNotices(res?.data.data);
                setLoading(false);
            } else {
                console.log("Error loading notices.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-6">Notices</h1>
                {isloading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <>
                        {notices.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {notices.map((item, index) => (
                                    <div
                                        key={index}
                                        className="shadow-lg p-4 rounded-lg bg-white border border-gray-200"
                                    >
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No Notices</p>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Notices;

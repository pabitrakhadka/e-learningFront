import Layout from '@/components/FrontEnd/Layout';
import { getNotice } from '@/function/notice';
import NepaliDateConverter from '@/utills/nepaliDate';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

const NoticeDetails = () => {
    const router = useRouter();
    const { notice_id } = router.query; // Extract notice_id from query parameters
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (notice_id) {
            loadNotice(notice_id);
        }
    }, [notice_id]);

    const loadNotice = async (id) => {
        try {
            const res = await getNotice(`id=${id}`);
            if (res.status === 200) {
                setNotice(res.data.data[0]);
            } else {
                setError('Failed to fetch notice details.');
            }
        } catch (err) {
            setError('An error occurred while fetching the notice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg font-medium text-gray-700">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg font-medium text-red-600">{error}</p>
                    </div>
                ) : notice ? (
                    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                            <p className="flex items-center space-x-2">
                                <FaCalendar color="blue" size={16} />
                                <span>Published On:  20255/15/2</span>
                            </p>
                            <p className="font-medium text-gray-700">- Notices</p>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                            {notice?.title}
                        </h1>
                        <div className="text-gray-700 mb-6">
                            <p>{notice?.content}</p>
                        </div>
                        {notice?.fileUrl ? (
                            <div className="overflow-hidden border rounded-md">
                                <iframe
                                    src={`${process.env.NEXT_PUBLIC_PDF}/${notice.fileUrl}`}
                                    className="w-full h-[80vh]"
                                    title="Notice PDF"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No file attached for this notice.</p>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg font-medium text-gray-700">No notice found.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NoticeDetails;

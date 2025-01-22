import React from 'react';
import Link from 'next/link';
import NepaliDateConverter from '@/utills/nepaliDate';
import { FaCalendar } from 'react-icons/fa';

const NoticeCard = ({ id, key, title, date }) => {
    return (
        <div
            key={key}
            className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-6"
        >
            {/* Title */}
            <Link
                className="text-lg font-semibold text-blue-600 hover:underline underline-offset-2 block mb-2"
                href={`/viewNotice/notice_id=${id}`}
            >
                {title}
            </Link>

            {/* Metadata */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <p className="flex items-center space-x-1">
                    <FaCalendar color="blue" size={16} />
                    <span>Public On: {NepaliDateConverter(date)}</span>
                </p>
                <p className="font-medium text-gray-700">- Notices</p>
            </div>
        </div>
    );
};

export default NoticeCard;

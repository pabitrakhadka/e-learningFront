import Link from 'next/link';
import React, { useState } from 'react'
import { FaTwitter, FaFacebook, FaPhoneFlip, FaMailchimp } from "react-icons/fa6";
import NavComp from './NavComp';


const Header = () => {

    const menuList = [
        {
            menu: 'गृहपृष्ट',
            to: '/',

        },
        {
            menu: 'परिचय',
            subMenu: [
                { menu: 'क्याम्पस व्यवस्थापन समिति', to: '/management' },
                { menu: 'विद्यालय व्यवस्थापन समिति', to: '/school_management' },
                { menu: 'प्राध्यापक तथा शिक्षक', to: '/teachers' },
            ],
        },
        {
            menu: 'कार्यक्रम',
            to: '/programs',
            subMenu: [{ menu: 'क्याम्पस', to: '/campus' }],
        },
        {
            menu: 'ई लाईबेरी',
            to: '/e_library',

        },
        {
            menu: 'सुचना तथा जानाकारी',
            to: '/notice',

        },
        {
            menu: 'ग्यालरी',
            to: '/galary',

        },
        {
            menu: 'सम्पर्क',
            to: '/contact',

        },
    ];

    return (
        <div className="">

            {/* Top section with icons */}
            <div className="flex bg-blue-800 h-9 justify-around items-center px-2 sm:px-6 md:px-4">
                <div>
                    <ul className="flex gap-6 sm:gap-8 md:gap-10">
                        <li>
                            <Link href={""}><FaFacebook size={20} color="white" /></Link>
                        </li>
                        <li>
                            <Link href={""}><FaTwitter size={20} color="white" /></Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex gap-6 sm:gap-8 md:gap-10">
                        <li>
                            <Link href={""}><FaPhoneFlip size={20} color="white" /></Link>
                        </li>
                        <li>
                            <Link href={""}><FaMailchimp size={20} color="white" /></Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Middle Section with Logo, Name, and Slogan */}
            <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-10 p-2">
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevcYvebib_qG-dMifR86sOnmaqC_9t1kEsw&s" height={100} width={100} alt="Logo" />
                </div>
                <div style={{ fontFamily: "Noto Sans Devanagari" }} className="text-center sm:text-left">
                    <h1 className="font-bold text-red-600 text-2xl sm:text-xl md:text-3xl lg: text-center">पुरनधार बहुमुखि क्याम्पस</h1>
                    <h1 className=" text-red-600 text-xl sm:text-xl md:text-xl lg:p-2 text-center">लुम्विनी प्रदेश हापुर् दाङ</h1>
                    <h1 className=" lg:p-1  text-red-600 text-xl sm:text-xl md:text-xl text-center">
                        "सिकाइ डिजिटल, भविष्य उज्ज्वल!"
                        "ई-लर्निङ: ज्ञानका लागि नयाँ दिशा।"
                        "घरमै बसेर डिजिटल माध्यमबाट शिक्षा।"
                    </h1>
                </div>
                <div className="hidden md:block">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/640px-Flag_of_Nepal.svg.png"
                        alt="Nepal Flag"
                        height={100}
                        width={100}
                    />
                </div>

            </div>

            {/* Menu */}
            <div>
                <NavComp menuList={menuList} />
            </div>

            {/* Highlight Section */}

        </div>

    )
}

export default Header
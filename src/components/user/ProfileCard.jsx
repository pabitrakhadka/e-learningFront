import React, { useContext } from 'react';
import ButtonComp from '@/Components/ButtonComp';
// import ScoreIcon from '@/Components/ScoreIcon';
import MyProfile from '@/Components/MyProfile';
import UserAuthContext from '@/Context/context';
import { logoutUser } from '@/function/logout';

import dynamic from 'next/dynamic';
import CheckLogin from '../CheckLogin';
// import useStatusHandler from '@/CustomHooks/useStatusHandler';
const Loders = dynamic(() => import('@/Components/Loders'), { ssr: false });
import CustomToast from '../CustomeTost';
import { useToast } from '@/Context/TostContext';
const ProfileCard = () => {
    // const { closeTost, showTost, statusCode, tostmessage, tostopen } = useStatusHandler();
    const { showTost } = useToast();
    const { user, loading, logout } = useContext(UserAuthContext
    );

    if (loading) {
        return <Loders />
    }

    if (!user) {
        return <CheckLogin />
    }
    const logoutButton = async () => {
        console.log("logout button", user);
        try {
            const res = await logoutUser(`role=user&userId=${user?.id}`)
            if (res.status === 200) {
                console.log("daaa=", res.data);
                console.log("logout success", res.data.message);

                showTost(res.status, res.data.message);
                setTimeout(() => {
                    logout();
                }, 1000);
            } else {
                console.log("logout failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-white shadow-md rounded-lg p-5 absolute top-15 right-5 z-10 sm:w-40 md:w-48 lg:w-56'>
            <div className='flex flex-col items-center'>
                <MyProfile />
                <div className='flex items-center mt-1'>
                    {/* <ScoreIcon score={user?.score || 512.12} /> */}
                </div>
                <div className='mt-4 w-full text-center'>
                    <ButtonComp onClick={logoutButton} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' name={"LogOut"} />
                </div>
            </div>
            <CustomToast message={tostmessage} onClose={closeTost} open={tostopen} statusCode={statusCode} />
        </div>
    );
};

export default ProfileCard;

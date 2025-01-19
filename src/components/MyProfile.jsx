import AuthContext from '@/Context/context'
import { fullName, getIconName } from '@/utills/fullName';
import React from 'react'
import { useContext } from 'react'
import CheckLogin from './CheckLogin';
import Loders from './Loders';

const MyProfile = () => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loders />
    }

    if (!user) {
        return <CheckLogin />
    }
    return (
        <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
            <div className="m-2">
                {user?.image ? <>
                    <img
                        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
                        src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="Profile"
                    />
                </> : <>
                    <div
                        className="rounded-full bg-blue-700 text-white h-10 w-10 flex items-center justify-center font-bold text-lg shadow-md"

                    >
                        {getIconName(user?.firstName)}
                    </div>
                </>}
            </div>
            <div>
                <h5 className="text-lg font-semibold sm:text-xl md:text-2xl">{fullName(user?.firstName, user?.lastName)}</h5>
                <p className="text-sm text-gray-500 sm:text-base md:text-lg"></p>
            </div>
        </div>
    )
}

export default MyProfile
import React from 'react';
import CardCom from './CardCom';
import ButtonComp from './ButtonComp';

const CheckLogin = () => {
    const handleLogin = () => {
        window.location.href = '/login';
    }

    return (
        <div className='flex justify-center items-center w-full min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-4'>
            <CardCom className='w-full max-w-md p-8 rounded-lg bg-white shadow-lg'>
                <h1 className='text-center text-2xl font-bold mb-4 text-red-600'>Unauthorized Access</h1>
                <p className='text-center text-gray-700 mb-6'>You need to be logged in to access this page. Please log in to continue.</p>
                <div className='flex justify-center'>
                    <ButtonComp onClick={() => handleLogin()} name={"Login"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
                </div>
            </CardCom>
        </div>
    );
}

export default CheckLogin;

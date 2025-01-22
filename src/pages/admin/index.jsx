import DashComp from '@/components/DashComp'
import DashLayout from '@/components/DashLayout'
import React, { useState } from 'react'

const index = () => {

    const [books, setBooks] = useState([]);
    const [notice, setNotice] = useState([]);
    const [news, setNews] = useState([]);
    const [category, setCategoroy] = useState([]);
    const [message, setMessage] = useState([]);
    return (
        <DashLayout>
            <div className=' '>
                <div className='flex'>
                    <DashComp title={"Total Users"} value={"10"} />
                    <DashComp title={"Total Notice"} value={"10"} />
                    <DashComp title={"Total Category"} value={"10"} />
                    <DashComp title={"Total Books"} value={"10"} />
                    <DashComp title={"Total Message"} value={"10"} />

                </div>
                <div>
                    <h1>Recent Create Books</h1>

                </div>
                <div>
                    <h1>Recent Create Notice</h1>
                </div>
                <div>
                    <h1>Recent Create News</h1>
                </div>
                <div>
                    <h1>Recent Create Category</h1>
                </div>
                <div>
                    <h1>Recent Create MEssage</h1>
                </div>
                <div>
                    <h1>Recent User Register</h1>
                </div>
            </div>

        </DashLayout>
    )
}

export default index
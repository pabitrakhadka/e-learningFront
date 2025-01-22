import React, { useEffect, useState } from 'react'
import Layout from '@/components/FrontEnd/Layout'
import { getBook } from '@/function/books';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/TableComp';
import ButtonComp from '@/components/ButtonComp';
import TableLoader from '@/components/UILoader/TableLoader';

const e_library = () => {
    const [books, setBooks] = useState([]);
    const [isloading, setLoading] = useState(true);
    const loadBooks = async () => {
        try {
            const res = await getBook("");
            if (res.status === 200) {
                setBooks(res?.data?.data);
                console.log(res?.data?.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        loadBooks();

    }, [])
    const downloadPdf = (url) => {
        const link = document.createElement('a');
        link.href = `${process.env.NEXT_PUBLIC_PDF}/${url}`;
        link.download = 'download.pdf';
        link.click();
    }
    return (
        <Layout>
            <div>
                <h1></h1>
                {isloading ? <><TableLoader /></> : <>

                    <div className='mt-2'>

                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>
                                        S.N
                                    </Th>
                                    <Th>Title</Th>
                                    <Th>Description</Th>
                                    <Th>Author</Th>
                                    <Th>File</Th>
                                    <Th>Date</Th>
                                    <Th>Download</Th>
                                </Tr>




                            </Thead>

                            <Tbody>
                                {books.length > 0 ? <>
                                    {books.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item?.title}</Td>
                                            <Td>{item?.description}</Td>
                                            <Td>{item?.author}</Td>
                                            <Td>{item?.fileUrl}</Td>
                                            <Td>{item?.fileUrl}</Td>

                                            <Td><ButtonComp onClick={() => downloadPdf(item?.fileUrl)} name={"Download"} /></Td>

                                        </Tr>
                                    ))}
                                </> : <></>}
                            </Tbody>
                        </Table>
                    </div></>}
            </div>
        </Layout>
    )
}

export default e_library
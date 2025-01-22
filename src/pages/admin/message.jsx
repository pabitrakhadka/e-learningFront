import ButtonComp from '@/components/ButtonComp';
import DashLayout from '@/components/DashLayout'
import { Table, Tbody, Td, Thead, Tr } from '@/components/TableComp';
import TableLoader from '@/components/UILoader/TableLoader';
import { useToast } from '@/Context/TostContext';
import { deleteContact, getContact } from '@/function/contact';
import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa6";

const message = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [contactData, setContactData] = useState([]);
    useEffect(() => {
        loadContactDetails();

    }, [])

    const handleDelete = async (id) => {
        if (!id) {
            showToast(400, "Id Is Missing..");
            return;
        }
        const result = confirm("Are Your Sure to Delte This Category?");
        if (result) {
            try {

                const res = await deleteContact(`id=${id}`);
                if (res?.status === 200) {
                    // Remove the category from the local state
                    setContactData((prev) => prev.filter((item) => item.id !== id));
                    showToast(res?.status, res?.data.message);
                } else {
                    showToast(res?.status, res?.data.message);

                }
            } catch (error) {
                console.log(error);
            }
        }


    }
    const loadContactDetails = async () => {
        try {
            console.log("d")
            const res = await getContact("");
            if (res.status === 200) {
                setContactData(res.data.data);
                console.log(res.data.data);
                console.log("Get Contact data");
                setLoading(false);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DashLayout>
            <div>
                {loading ? <><TableLoader /></> : <><Table>
                    <Thead>
                        <Td>S.N</Td>
                        <Td>Name</Td>
                        <Td>Email</Td>
                        <Td>Subject</Td>
                        <Td>Message</Td>
                        <Td>Date</Td>
                        <Td>Action</Td>

                    </Thead>
                    <Tbody>
                        {
                            contactData.length > 0 ? <>
                                {contactData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item?.name}</Td>
                                        <Td>{item?.email}</Td>
                                        <Td>{item?.subject}</Td>
                                        <Td>{item?.message}</Td>
                                        <Td>{item?.createdAt}</Td>
                                        <Td><ButtonComp icon={<FaTrash size={25} />} onClick={() => handleDelete(item?.id)} /></Td>







                                    </Tr>
                                ))}
                            </> : <>
                                <p>No Data Found !</p>
                            </>
                        }
                    </Tbody>
                </Table></>}
            </div>
        </DashLayout>
    )
}

export default message
import ButtonComp from '@/components/ButtonComp';
import DashLayout from '@/components/DashLayout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/TableComp';
import { useToast } from '@/Context/TostContext';
import { deleteUser, getUser } from '@/function/user';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    confirm_password: ""
};
const users = () => {
    const { showToast } = useToast();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {

        loadUser();

    }, [])
    const loadUser = async () => {
        try {
            const res = await getUser();
            if (res.status === 200) {
                setLoading(false);
                setUserData(res.data.data);
                console.log("user data=", res.data);
            }

        } catch (error) {

        }
    }


    const handleDelete = async (id) => {
        if (!id) {
            showToast(400, "Id Is Missing..");
            return;
        }
        const result = confirm("Are Your Sure to Delte This Category?");
        if (result) {
            try {

                const res = await deleteUser(`id=${id}`);
                if (res?.status === 200) {
                    // Remove the category from the local state
                    setUserData((prev) => prev.filter((item) => item.id !== id));
                    showToast(res?.status, res?.data.message);
                } else {
                    showToast(res?.status, res?.data.message);

                }
            } catch (error) {
                console.log(error);
            }
        }


    }
    return (
        <DashLayout>
            <div>
                <ButtonComp name={'Add User'} />
                <h1>Users</h1>
                <div>
                    <Table>
                        <Thead>
                            <Th>S.N</Th>
                            <Th>Name</Th>
                            <Th>Address</Th>
                            <Th>Email</Th>
                            <Th>Date</Th>
                            <Th>Action</Th>

                        </Thead>
                        <Tbody>
                            {userData.length > 0 ? <>
                                {userData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>{item.createAt}</Td>
                                        <Td>
                                            <ButtonComp onClick={() => handleDelete(item?.id)} icon={<FaTrash size={25} />} />

                                        </Td>




                                    </Tr>
                                ))}
                            </> : <></>}
                        </Tbody>
                    </Table>
                </div>
            </div>

        </DashLayout>
    )
}

export default users
import ButtonComp from '@/components/ButtonComp';
import DashLayout from '@/components/DashLayout'
import FileInputComp from '@/components/FileInputComp';
import InputComp from '@/components/InputComp';
import Modal from '@/components/Model';
import React, { useState } from 'react'

const setting = () => {
    const [isModel, setModel] = useState(false);

    const openModal = () => {
        setModel(true);
    }

    const closeModal = () => {
        setModel(false);
    }

    const menuName = [
        { label: "General Settings" },
        {
            label: "Settings and Configuration"
        },

    ]
    const [activeSetting, setActiveSetting] = useState(menuName[0].label);

    const renderSettingContent = () => {
        switch (activeSetting) {
            case "General Settings":
                return <div>
                    <div>
                        <h1>Website Name</h1>
                        <InputComp name={"Website Name"} />
                    </div>
                    <div>
                        <h1>Slug</h1>
                        <InputComp name={"slug"} value={"dfd"} />
                    </div>
                    <div>
                        <h1>Change Image</h1>
                        <div>
                            <ButtonComp onClick={openModal} name={"Upload Image"} />
                            <div className='flex'>
                                <div>
                                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevcYvebib_qG-dMifR86sOnmaqC_9t1kEsw&s" alt="" /></div>
                                    <ButtonComp name={"Delete"} />
                                </div>
                                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevcYvebib_qG-dMifR86sOnmaqC_9t1kEsw&s" alt="" /></div>
                            </div>
                            <Modal isOpen={isModel} title={"Upload Logo"} onClose={closeModal}>
                                <div>
                                    <form action="">

                                        <FileInputComp />
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
        }
    }
    return (
        <DashLayout>
            <div>
                <h1>Settings</h1>

                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4">
                        <h2 className="text-lg font-semibold mb-4">Settings Menu</h2>
                        <ul className="space-y-2">
                            {menuName.map((item, index) => (
                                <li
                                    key={index}
                                    className={`p-2 rounded cursor-pointer hover:bg-blue-100 transition ${activeSetting === item.label ? "bg-blue-200 font-bold" : ""
                                        }`}
                                    onClick={() => setActiveSetting(item.label)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4 p-6">
                        <h1 className="text-2xl font-bold mb-4">{activeSetting}</h1>
                        <div className="bg-white shadow p-4 rounded-lg min-h-52">
                            {renderSettingContent()}
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    )
}

export default setting
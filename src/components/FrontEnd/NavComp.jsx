import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

const NavComp = ({ menuList }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSubMenu, setCurrentSubMenu] = useState([]);

    const handleMenuClick = (event, subMenu) => {
        if (subMenu?.length) {
            setAnchorEl(event.currentTarget);
            setCurrentSubMenu(subMenu);
        } else {
            setAnchorEl(null); // Close any open submenus
            setCurrentSubMenu([]); // No submenu to display
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentSubMenu([]);
    };

    return (
        <div className="flex justify-center p-2 sm:p-3 md:p-2 w-full bg-gray-100 shadow-md">
            {/* Menu List */}
            <div className="flex flex-wrap justify-center w-full max-w-screen-lg">
                {menuList.map((menu, index) => (
                    <div style={{ fontFamily: "Noto Sans Devanagari" }} key={index} className="mx-2 my-2 sm:mx-3 md:mx-2">
                        {menu.subMenu ? (
                            <Button
                                className="text-lg sm:text-xl text-blue-600 hover:text-blue-800 focus:outline-none"
                                onClick={(event) => handleMenuClick(event, menu.subMenu)}
                            >
                                {menu.menu}
                            </Button>
                        ) : (
                            <Link href={menu.to || '#'} passHref>
                                <Button className="text-lg sm:text-xl text-blue-600 hover:text-blue-800 focus:outline-none">
                                    {menu.menu}
                                </Button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Submenu Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List className="bg-white shadow-lg rounded-lg w-48 sm:w-60 md:w-72">
                    {currentSubMenu.length > 0 ? (
                        currentSubMenu.map((subMenuItem, subIndex) => (
                            <ListItem key={subIndex} button className="hover:bg-gray-200">
                                <Link href={subMenuItem.to || '#'} passHref>
                                    <ListItemText
                                        primary={subMenuItem.menu}
                                        className="text-gray-700"
                                    />
                                </Link>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText
                                primary="No submenu available"
                                className="text-gray-500"
                            />
                        </ListItem>
                    )}
                </List>
            </Popover>
        </div>

    );
};

export default NavComp;

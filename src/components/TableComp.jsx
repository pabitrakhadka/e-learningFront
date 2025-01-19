import React from "react";

// Table component
const Table = ({ children }) => {
    return (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            {children}
        </table>
    );
};

// Th component
const Th = ({ children, className }) => {
    return (
        <th
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
        >
            {children}
        </th>
    );
};

// Td component
const Td = ({ colspan, children, className }) => {
    return (

        <td colSpan={colspan} className={`px-6 py-4 text-sm ${className}`}>{children}</td>


    );
};
const Tbody = ({ children, className }) => {
    return (
        <tbody className={`divide-y divide-gray-200${className}`}>{children}</tbody>
    );
};
const Thead = ({ children, className }) => {
    return (
        <thead className={`bg-gray-100${className}`}>{children}</thead>
    );
};
const Tr = ({ rowspan, children, className }) => {
    return (

        <tr rowspan={rowspan} className={`px-6 py-4 text-sm ${className}`}>{children}</tr>


    );
};




export { Table, Td, Th, Tbody, Thead, Tr }


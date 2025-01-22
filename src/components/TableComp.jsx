import React, { useState } from "react";

// Table component
const Table = ({ children }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                {children}
            </table>
        </div>
    );
};

// Th component
const Th = ({ children, className, colSpan }) => {
    return (
        <th
            colSpan={colSpan}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
        >
            {children}
        </th>
    );
};

// Td component
const Td = ({ colspan, children, className }) => {
    return (
        <td colSpan={colspan} className={`px-6 py-4 text-sm ${className}`}>
            {children}
        </td>
    );
};

const Tbody = ({ children, className }) => {
    return <tbody className={`divide-y divide-gray-200 ${className}`}>{children}</tbody>;
};

const Thead = ({ children, className }) => {
    return <thead className={`bg-gray-100 ${className}`}>{children}</thead>;
};

const Tr = ({ rowspan, children, className }) => {
    return (
        <tr rowSpan={rowspan} className={`px-6 py-4 text-sm ${className}`}>
            {children}
        </tr>
    );
};

// Searchable, Responsive, and Paginated Table Component
const SearchableTable = ({ data, columns, rowsPerPage = 5 }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter the data based on the search query
    const filteredData = data.filter((item) =>
        columns.some((col) =>
            item[col.key].toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Pagination logic
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Table */}
            <Table>
                <Thead>
                    <Tr>
                        {columns.map((col) => (
                            <Th key={col.key}>{col.header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((col) => (
                                <Td key={col.key}>{row[col.key]}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Table, Td, Th, Tbody, Thead, Tr, SearchableTable };

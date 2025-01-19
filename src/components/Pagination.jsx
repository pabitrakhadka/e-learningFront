import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div style={{ marginTop: '20px' }}>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        background: page === currentPage ? 'blue' : 'gray',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination


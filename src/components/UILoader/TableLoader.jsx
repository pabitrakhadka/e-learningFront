import React from 'react'

const TableLoader = () => {
    return (
        <div class="w-full max-w-4xl mx-auto">

            <div class="flex bg-gray-200 rounded-t-md px-4 py-2 font-medium text-gray-700">
                <div class="w-1/4">S.N</div>
                <div class="w-1/4">Title</div>
                <div class="w-1/4">Description </div>
                <div class="w-1/4">Author</div>
                <div class="w-1/4">File</div>

                <div class="w-1/4">Date</div>
                <div class="w-1/4">Action</div>

            </div>

            <div class="divide-y divide-gray-200 border border-gray-200 rounded-b-md">

                <div class="flex animate-pulse px-4 py-3">
                    <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                </div>

                <div class="flex animate-pulse px-4 py-3">
                    <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                </div>
                <div class="flex animate-pulse px-4 py-3">
                    <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                    <div class="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                </div>
            </div>
        </div>
    )
}

export default TableLoader
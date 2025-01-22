// import React, { useState } from 'react';
// import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PdfViewer = ({ fileUrl }) => {
//     const [scale, setScale] = useState(1); // Initial zoom level

//     const zoomIn = () => {
//         setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Maximum zoom level: 3
//     };

//     const zoomOut = () => {
//         setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Minimum zoom level: 0.5
//     };

//     const resetZoom = () => {
//         setScale(1); // Reset zoom to the default level
//     };

//     return (
//         <div
//             style={{
//                 border: '1px solid rgba(0, 0, 0, 0.3)',
//                 height: '100%',
//                 width: '100%',
//                 overflow: 'hidden',
//                 position: 'relative', // For positioning zoom controls
//             }}
//         >
//             <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}>
//                 <Viewer
//                     fileUrl={fileUrl}
//                     defaultScale={SpecialZoomLevel.PageWidth} // Fit PDF to the container width initially
//                     plugins={[]}
//                     renderPage={(props) => (
//                         <div
//                             style={{
//                                 transform: `scale(${scale})`,
//                                 transformOrigin: 'top left',
//                             }}
//                         >
//                             {props.canvasLayer.children}
//                         </div>
//                     )}
//                     renderError={(error) => (
//                         <div style={{ padding: '16px', color: 'red' }}>
//                             <h4>Failed to load PDF</h4>
//                             <p>{error?.message || 'An unexpected error occurred.'}</p>
//                         </div>
//                     )}
//                 />
//             </Worker>
//             <div
//                 style={{
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     zIndex: 1000,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '8px',
//                 }}
//             >
//                 <button
//                     style={{
//                         padding: '8px',
//                         backgroundColor: '#007bff',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                     }}
//                     onClick={zoomIn}
//                 >
//                     Zoom In
//                 </button>
//                 <button
//                     style={{
//                         padding: '8px',
//                         backgroundColor: '#28a745',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                     }}
//                     onClick={zoomOut}
//                 >
//                     Zoom Out
//                 </button>
//                 <button
//                     style={{
//                         padding: '8px',
//                         backgroundColor: '#dc3545',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                     }}
//                     onClick={resetZoom}
//                 >
//                     Reset Zoom
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PdfViewer;
"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const PdfViewer = ({ url }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div className="h-screen w-screen">
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">

                {/* {console.log(url)} */}
                <Viewer
                    defaultScale={1}
                    scrollMode="true"
                    fileUrl={`${process.env.NEXT_PUBLIC_PDF}/${url}`}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};
export default PdfViewer;
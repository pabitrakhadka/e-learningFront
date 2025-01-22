import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
const PhotoViewer = ({ image, desc, }) => {
    return (
        <PhotoProvider
            toolbarRender={({ rotate, onRotate, onScale, scale }) => (
                <div className="flex justify-between w-full p-2">
                    <svg
                        className="PhotoView-Slider__toolbarIcon cursor-pointer"
                        onClick={() => onRotate(rotate + 90)}
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path
                            fill="currentColor"
                            d="M12 4V1L8 5l4 4V6h6V4h-6z"
                        />
                    </svg>
                    <div className="flex space-x-2">
                        <svg
                            className="PhotoView-Slider__toolbarIcon cursor-pointer"
                            onClick={() => onScale(scale + 0.1)}
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            />
                        </svg>
                        <svg
                            className="PhotoView-Slider__toolbarIcon cursor-pointer"
                            onClick={() => onScale(scale - 0.1)}
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-opacity-50 bg-black text-white text-center p-2 rounded-b-md">
                        <p className="text-sm">{desc ? desc : 'Untitled'}</p>

                    </div>
                </div>


            )}
        >
            <div className="">

                <PhotoView

                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                    speed={800}
                    easing={(type) =>
                        type === 2
                            ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
                            : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }
                >
                    <div className="relative">
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                            alt={desc || 'Image'}
                            className="rounded-md shadow-md cursor-pointer w-full h-[400px] object-cover"
                        />
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 w-full bg-opacity-50 bg-black text-white text-center p-2 rounded-b-md">
                            <p className="text-sm">{desc ? desc : 'Untitled'}</p>
                        </div>
                    </div>
                </PhotoView>

            </div>
        </PhotoProvider>
    )
}

export default PhotoViewer
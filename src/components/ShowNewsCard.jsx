import React from 'react'
import ButtonComp from './ButtonComp'
import { useToast } from '@/Context/TostContext'
import { useRouter } from 'next/router';

const ShowNewsCard = ({ image, cardTitle, description, news_id }) => {
    const { showToast } = useToast();
    const router = useRouter();
    const handleButtonClick = (id) => {
        if (!id) {
            showToast(404, "ID is Mising");
            return;
        }
        router.push(`/viewNews/${id}`);
    }
    return (
        <div>
            {image ? <>< img className="w-full h-48 object-cover" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`} alt="Card Image" /></> : <><img className="w-full h-48 object-cover" src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=" alt="Card Image" /></>
            }
            <div className="p-4" >
                <h2 className="text-xl font-semibold text-gray-800">{cardTitle}</h2>
                <p className="mt-2 text-gray-600">
                    {description.split(" ").slice(0, 15).join(" ")}
                    {description.split(" ").length > 15 && "..."}
                </p>

                <ButtonComp onClick={() => handleButtonClick(news_id)} name={"Read More"} />
                {/*                 
                < className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Learn More
                </button> */}
            </div>
        </div >
    )
}

export default ShowNewsCard
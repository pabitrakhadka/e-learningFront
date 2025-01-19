import React, { useEffect, useState } from 'react'
import Layout from '@/components/FrontEnd/Layout'
import CustomCarousel from '@/components/FrontEnd/ImageSlider'
import Marquee from 'react-fast-marquee'
import { getNews } from '@/function/content'
import CardCom from '@/components/CardCom'
import ShowNewsCard from '@/components/ShowNewsCard'
import { useRouter } from 'next/router'

const images = [
  { imgURL: "https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-giant-elephant-in-the-forest-eating-grass-image_2555676.jpg", imgAlt: "image1" },
  { imgURL: "https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-landscape-hd-wallpaper-backgrounds-best-wallpaper-image_2929886.jpg", imgAlt: "image1" },
  { imgURL: "https://c4.wallpaperflare.com/wallpaper/849/138/463/nature-high-resolution-wallpaper-preview.jpg", imgAlt: "bb" },
  { imgURL: "https://c4.wallpaperflare.com/wallpaper/3/233/136/high-quality-nature-download-1920x1200-wallpaper-preview.jpg", imgAlt: "image1" }
]
const index = () => {
  const [hover, setHover] = useState(false);
  const [items] = useState([
    { text: 'Item 1', link: '/item1' },
    { text: 'Item 2', link: '/item2' },
    { text: 'Item 3', link: '/item3' },
  ]);
  const router = useRouter()
  const [isloading, setIsloading] = useState({
    isnewsData: true,
    isinformatin: true,
    isdownloadData: true
  });
  const [newsData, setNewData] = useState([]);
  const [imformatin, setInformation] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(() => {

    loadNews();
  }, [])

  const loadNews = async () => {
    try {
      const res = await getNews();
      if (res.status === 200) {
        setNewData(res.data.data);
        console.log(res.data.data);
        setIsloading((prev) => ({
          ...prev,
          isnewsData: false
        }));
      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }
  const loadInformation = () => {
    try {
      const res = awaitget
      if (res.status === 200) {

      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadDownloadInformation = () => {
    try {
      const res = awaitget
      if (res.status === 200) {

      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="bg-red-700 text-white flex items-center overflow-hidden p-2 sm:p-4">
        <div>
          <h1 className="text-xl sm:text-xl md:text-2xl">Highlight</h1>
        </div>
        <div className="w-full">
          <Marquee pauseOnHover={true} speed={50}>
            {newsData.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  router.push(`/viewNews/${item?.id}`);
                  // console.log('test', item?.id);
                  router
                }}
                className="cursor-pointer mx-4 sm:mx-6"
              >
                {item.title}
              </span>
            ))}
          </Marquee>
        </div>
        {hover && (
          <ul
            className="bg-white text-black absolute top-full left-0 w-full sm:w-auto p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  // console.log('test', item?.id);
                  router.push(`/viewNews/${item?.id}`);


                }}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}

      </div>
      <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>

      <div className="flex flex-col md:flex-row gap-6 p-5">
        {/* News Section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">News</h1>
            {isloading.isnewsData ? (
              <></>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.length > 0 ? (
                  newsData.map((item, index) => (
                    <div className="shadow-lg p-4 rounded-lg bg-white" key={index}>
                      <ShowNewsCard
                        image={item?.file_url}
                        cardTitle={item?.title}
                        description={item?.description}
                        news_id={item?.id}
                      />
                    </div>
                  ))
                ) : (
                  <p>No news available.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-8">
          {/* Notices Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Notices</h1>
            {isloading.isnewsData ? (
              <></>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {newsData.length > 0 ? (
                  newsData.map((item, index) => (
                    <div className="shadow-lg p-4 rounded-lg bg-white" key={index}>
                      <ShowNewsCard
                        image={item?.file_url}
                        cardTitle={item?.title}
                        description={item?.description}
                      />
                    </div>
                  ))
                ) : (
                  <p>No notices available.</p>
                )}
              </div>
            )}
          </div>

          {/* Download Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Download</h1>
            {isloading.isnewsData ? (
              <></>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {newsData.length > 0 ? (
                  newsData.map((item, index) => (
                    <div className="shadow-lg p-4 rounded-lg bg-white" key={index}>
                      <ShowNewsCard
                        image={item?.file_url}

                        cardTitle={item?.title}
                        description={item?.description}
                      />
                    </div>
                  ))
                ) : (
                  <p>No downloads available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default index
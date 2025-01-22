import React, { useEffect, useState } from 'react'
import Layout from '@/components/FrontEnd/Layout'

import Marquee from 'react-fast-marquee'
import { getNews } from '@/function/content'
import CardCom from '@/components/CardCom'
import ShowNewsCard from '@/components/ShowNewsCard'
import { useRouter } from 'next/router'
import { getNotice } from '@/function/notice'
import { getBook } from '@/function/books'
import NoticeCard from '@/components/NoticeCard'
import CardNewsLoader from '@/components/UILoader/CardNewsLoader '
import SliderImageLoader from '@/components/UILoader/SliderImageLoader'
import { getImage } from '@/function/image'
import SimpleImageSlider from "react-simple-image-slider";
import CustomCarousel from '@/components/FrontEnd/ImageSlider'
import ImageSlider from 'react-simple-image-slider'
import SliderImage from '@/components/SliderImage'


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
    isNotice: true,
    isbook: true,
    isSlider: true
  });
  const [newsData, setNewData] = useState([]);
  const [notices, setNotices] = useState([]);
  const [books, setBooks] = useState([]);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const [images, setImages] = useState([]);

  useEffect(() => {

    loadNews();
    loadNotice();
    loadBooks(); loadImages();
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
  const loadNotice = async () => {
    try {
      const res = await getNotice("");



      if (res.status === 200) {
        setNotices(res?.data.data);
        setIsloading((prev) => ({
          ...prev,
          isNotice: false
        }));
      } else {
        console.log("erropr");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadBooks = async () => {
    try {
      const res = await getBook('');
      if (res.status === 200) {
        setBooks(res?.data?.data);
        setIsloading((prev) => ({
          ...prev,
          isbook: false
        }));
      } else {
        console.log("Heloo");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const loadImages = async () => {
    try {
      const res = await getImage('');
      if (res.status === 200) {
        console.log("images=", res?.data?.data);
        setImages(res?.data?.data);
        setIsloading((prev) => ({
          ...prev,
          isSlider: false
        }));
      } else {
        console.log("Heloo");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="bg-blue-400 text-white flex items-center overflow-hidden p-2 sm:p-4">
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

      <div>
        {isloading.isSlider ? (
          <SliderImageLoader />
        ) : (

          <SliderImage images={images} />
        )}
      </div>



      <div className="flex flex-col md:flex-row gap-6 p-5">
        {/* News Section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">News</h1>
            {isloading.isnewsData ? (
              <></>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isloading.isnewsData ? <><CardNewsLoader /></> : <>{newsData.length > 0 ? (
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
                )}</>}
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
                {notices.length > 0 ? (
                  notices.map((item, index) => (
                    <div className="shadow-lg p-4 rounded-lg bg-white" key={index}>
                      <NoticeCard id={item?.id} title={item?.title} date={item?.createdAt} />
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
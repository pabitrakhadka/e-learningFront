import React, { useEffect, useState } from "react";
import Layout from "@/components/FrontEnd/Layout";
import { useRouter } from "next/router";
import { getNews } from "@/function/content";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import NepaliDateConverter from "@/utills/nepaliDate";

const NewsDetail = () => {
    const router = useRouter();
    const { news_id } = router.query; // Extract news_id from query parameters
    const [news, setNews] = useState(null);

    useEffect(() => {
        if (news_id) {
            loadNews(news_id);
        }
    }, [news_id]);

    const loadNews = async (id) => {
        try {
            const res = await getNews(`id=${id}`);
            if (res.status === 200) {

                setNews(res.data.data); // Replace mock data with res.data.data in real API call
            }
        } catch (error) {
            console.error("Error loading news:", error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                {news ? (
                    <div className="max-w-3xl mx-auto">
                        <Card className="shadow-lg transition duration-300">
                            <CardMedia
                                component="img"
                                height="400"
                                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${news?.file_url}`}
                                alt={news.title}
                                className="rounded-t-lg"
                            />
                            <CardContent>
                                <Typography variant="h4" component="h1" className="font-bold mb-4">
                                    {news.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className="mb-6 text-gray-600"
                                >
                                    Published on: {NepaliDateConverter(news.created_at)}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    className="leading-7 whitespace-pre-wrap"
                                >
                                    {news.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Typography variant="body1" color="textSecondary" className="text-center">
                        Loading news...
                    </Typography>
                )}
            </div>
        </Layout>
    );
};

export default NewsDetail;

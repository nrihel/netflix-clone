"use client"; 
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    
    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("api/movies");
            const randomNum = Math.floor(Math.random() * data.length);
            setRandomMovie(data[randomNum]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    console.log("randomMovie: ", randomMovie);

    return <div className="h-screen relative">
        <video
            src={randomMovie?.videoUrl}
            poster={randomMovie?.thumbnailUrl}
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 
        transform flex flex-col gap-4">
            <h1 className="text-[5xl] text-white font-bold">{randomMovie?.title}</h1>
            <p className="text-white">{randomMovie?.description}</p>
            <div>
                <button>
                    <Image
                        src="/assets/play.svg"
                        width={24}
                        height={24}
                        alt="Play video"
                    />
                </button>
            </div>
        </div>
    </div>;
};

export default Billboard;
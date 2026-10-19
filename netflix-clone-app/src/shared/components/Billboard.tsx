"use client"; 
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieInfoModal from "./MovieInfoModal";
import ReactPlayer from "react-player";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            const randomNum = Math.floor(Math.random() * data.length);
            setRandomMovie(data[randomNum]);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePlayButtonClick = () => {
        setIsPlaying(true);
    };

    const handleOpenInfoModal = ()=> {
        setShowInfoModal(true);
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return <div className="h-screen relative">
        {randomMovie?.trailerKey && (
  <div className="w-full h-full">
    {isPlaying ? (
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${randomMovie.trailerKey}`}
        width="100%" height="100%" playing controls
      />
    ) : (
      <Image
        src={randomMovie.thumbnailUrl || "/assets/placeholder.png"}
        alt={randomMovie.title || "Movie poster"}
        width={1260} height={1260} className="w-full h-full object-cover"
      />
    )}
  </div>  
)}
{isPlaying && (
            <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-16 right-6 z-10 rounded bg-white px-4 py-2 text-black cursor-pointer"
            >
                Back to poster
            </button>
        )}
        <div className={`${isPlaying ? "hidden" : "flex"} absolute top-1/2 left-10 
        -translate-y-1/2 transform flex-col gap-4`}>
            <h1 className="text-[5xl] text-white font-bold">{randomMovie?.title}</h1>
            <p className="text-white">{randomMovie?.description}</p>
            <div className="flex gap-2">
                <button className="text-lg font-semibold bg-white py-2 px-5 
                text-black rounded-sm cursor-pointer flex gap-4 hover:bg-[#ffffffbf]"
                onClick={handlePlayButtonClick}>
                    <Image
                        src="/assets/play.svg"
                        width={24}
                        height={24}
                        alt="Play video"
                    />
                    Play
                </button>
                <button className="text-lg font-semibold bg-[#6d6d6eb3] py-2 px-5 
                text-white rounded-sm cursor-pointer flex gap-4 hover:bg-[#6d6d6e66]"
                onClick={handleOpenInfoModal}>
                    <Image
                        src="/assets/info.svg"
                        width={24}
                        height={24}
                        alt="Play video"
                    />
                    More Info
                </button>
            </div>
        </div>
        {showInfoModal ? (
            <MovieInfoModal 
            showInfoModal={showInfoModal} 
            setShowInfoModal={setShowInfoModal}
            movieData={randomMovie}
            />
        ) : null}
    </div>
};

export default Billboard;
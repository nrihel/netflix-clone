import { IMovie } from "@/types/movie.types";
import { clsx } from "clsx";
import Image from "next/image";
import ReactPlayer from "react-player";
import React from "react";
import { useRef, useState } from "react";

const MoviePopup = ({ movie }: {movie: IMovie }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

        const handlePlayButtonClick = () => {
            if (videoRef.current) {
                setIsVideoPlaying(true);
                videoRef.current.play();
                videoRef.current.requestFullscreen();
            }
        };

    return (
        <div className="absolute -left-8 w-80 z-10 -top-16 rounded-md text-base
        transition scale-75 hover:scale-100 hover:-translate-y-6 transition-transform
        duration-300 ease-in-out"
        >
            <ReactPlayer 
                ref={videoRef} 
                src={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                poster={movie.thumbnailUrl} 
                className={clsx({ hidden: !isVideoPlaying })}
            />
            <div className="relative w-80 h-[140px]">
                <Image
                    className="object-cover"
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                />
            </div>
            <div className="bg-[#181818] p-4">
                <div className="flex justify-between mb-2 items-center">
                    <div className="flex gap-2 items-center">
                        <button className="bg-white border-2 rounded-full p-2 
                        border-[#ffffff45680] cursor-pointer"
                        onClick={handlePlayButtonClick}
                        >
                            <Image 
                                src={"/assets/play.svg"} 
                                width={20} 
                                height={20} 
                                alt="Play" 
                            />
                        </button>
                        <button className="bg-[#2a2a2a99] border-2 rounded-full p-2 
                        border-[#ffffff80] cursor-pointer"
                        onClick={handlePlayButtonClick}
                        >
                            <Image 
                                src={"/assets/plus.svg"} 
                                width={20} 
                                height={20} 
                                alt="Add" 
                            />
                        </button>
                    </div>
                    <button className="cursor-pointer bg-[#2a2a2a99] border-2 border-[#ffffff80]
                    p-2 rounded-full hover:bg-[#ffffff1a] hover:border-white">
                        <Image
                            src={"/assets/down-arrow.svg"}
                            width={24}
                            height={24}
                            alt="Show movie details" 
                        />
                    </button>
                </div>
                <div className="flex gap-2 items-center at-4">
                    <span
                    className="px-2 uppercase whitespace-nowrap text-[#bcbcbc]
                    text-sm font-medium border border-[#fff6]"
                    >
                        UA 13+
                    </span>
                    <span className="text-[#bcbcbc] border border-[#fff6] rounded-[3px]
                    text-xs px-1.5">
                        HD
                    </span>                     
                </div>
            </div>
        </div>
    );
};

export default MoviePopup;
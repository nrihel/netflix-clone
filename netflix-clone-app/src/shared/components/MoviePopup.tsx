import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import ReactPlayer from "react-player";
import React, { useMemo } from "react";
import { useRef, useState } from "react";
import useUser from "@/stores/user.store";
import axios from "axios";

const MoviePopup = ({ 
    movie, 
    handleOpenInfoModal, 
}: { 
    movie: IMovie; 
    handleOpenInfoModal: () => void; 
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const fullscreenRef = useRef<HTMLDivElement>(null);
    const { user, updateUser, updateFavorites} = useUser()

    const isFavorite = useMemo(() => {
        return user?.favorites.includes(Number(movie.id)) ?? false;
        }, [user, movie]);

        const handlePlayButtonClick = () => {
            if (videoRef.current) {
                setIsVideoPlaying(true);
                videoRef.current.play();
                fullscreenRef.current?.requestFullscreen();
            }
        };

        const toggleFavorites = async (movieId: string | number) => {
            try {
                if(isFavorite) {
                    await axios.delete("/api/favorite", { data: { movieId }});
                } else {
                    await axios.post("/api/favorite", { movieId });
                }
                updateUser();
                updateFavorites();

            } catch (error) {
                console.log(error);
            }
        }

    return (
        <div className="absolute -left-8 w-80 z-10 -top-16 rounded-md text-base
        transition scale-75 hover:scale-100 hover:-translate-y-6 transition-transform
        duration-300 ease-in-out popupShadow"
        >
            <div
                ref={fullscreenRef}
                className="relative bg-black fullscreen:w-screen fullscreen:h-screen"
                >
                <div className={isVideoPlaying ? "w-full h-full" : "hidden"}>
                    <ReactPlayer
                    ref={videoRef}
                    src={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                    width="100%"
                    height="100%"
                    />
                </div>
                
                {isVideoPlaying && (
                    <button
                    type="button"
                    onClick={() => {
                        if (document.fullscreenElement) {
                        document.exitFullscreen();
                        }
                        setIsVideoPlaying(false);
                    }}
                    className="absolute top-26 right-10 z-50 rounded bg-white px-4 py-2 text-black cursor-pointer"
                    >
                    Back
                    </button>
                )}
                </div>
            {!isVideoPlaying && (
            <div className="relative w-80 h-[140px]">
                <Image
                    className="object-cover"
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                />
            </div>
            )}
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
                        onClick={() => toggleFavorites(movie.id)}
                        >
                            <Image 
                                src={`/assets/${isFavorite ? "white-tick" : "plus"}.svg`} 
                                width={20} 
                                height={20} 
                                alt="Add" 
                            />
                        </button>
                    </div>
                    <button className="cursor-pointer bg-[#2a2a2a99] border-2 border-[#ffffff80]
                    p-2 rounded-full hover:bg-[#ffffff1a] hover:border-white"
                        onClick={handleOpenInfoModal}>
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
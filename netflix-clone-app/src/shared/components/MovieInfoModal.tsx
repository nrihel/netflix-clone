import { useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { Dialog, DialogContent } from "../ui/Dialog"
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import useUser from "@/stores/user.store";
import axios from "axios";

interface IMovieInfoModalProps {
    showInfoModal: boolean;
    setShowInfoModal: (value: boolean) => void;
    movieData: IMovie | null;
}
const MovieInfoModal = ({ 
    showInfoModal, 
    setShowInfoModal, 
    movieData 
}: IMovieInfoModalProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { updateUser, updateFavorites, user } = useUser

    const isFavorite = useMemo(() => {
        return user?.favorites.includes(movieData?.id || "")
    }, [user, movieData]);

    const toggleFavorites = async () => {
        try {
            if(isFavorite) {
                await axios.delete("/api/favorite", {
                    data: { movieId: movieData?.id },
                });
            } else {
                await axios.post("/api/favorite", { movieId: movieData?.id });
            }
            updateUser()
            updateFavorites()
        } catch (error) {
            console.log(error)
        }
    }

    const handlePlayButtonClick = () => {
        setIsPlaying(true);
    };
    
    return (
    <Dialog open={showInfoModal} onOpenChange={() => setShowInfoModal(false)}>
        <DialogContent className="bg-[#181818] border-none min-w-[700px] p-0">
            <div className="flex flex-col gap-4 w-full">
                <div className="relative">
                    {movieData?.trailerKey ? (
                        <div className="w-full h-[350px] overflow-hidden">
                            <ReactPlayer
                                src={`https://www.youtube.com/watch?v=${movieData.trailerKey}`}
                                width="100%"
                                height="100%"
                                playing={isPlaying}
                                muted={!isPlaying}
                                controls={isPlaying}
                                onError={(error) => console.log("Trailer error:", error)}
                            />
                        </div>
                            ) : (
                            <Image
                                src={movieData?.thumbnailUrl || "/assets/placeholder.png"}
                                alt={movieData?.title || "Movie poster"}
                                width={700}
                                height={350}
                                className="w-full h-[350px] object-cover"
                            />
                    )}
                    <div className="absolute bottom-4 left-6 flex flex-col gap-5 
                    items-center">
                        <h1 className="text-4xl text-white font-bold self-start">
                            {movieData?.title}
                        </h1>
                        <div className="flex self-start gap-3">
                            <button className="flex gap-2 bg-white p-2 px-3.5 rounded-sm 
                            self-start cursor-pointer font-bold"
                            onClick={handlePlayButtonClick}
                            >
                                <Image 
                                    src="/assets/play.svg" 
                                    width={24} 
                                    height={24} 
                                    alt="Play" 
                                />
                                Play
                            </button>
                            <button className="bg-transparent border-2 rounded-full p-2 border-white 
                            cursor-pointer"
                            onClick={toggleFavorites}
                            >
                                <Image 
                                    src={`/assets/${isFavorite ? "white-tick" : "plus"}.svg`}
                                    width={23} 
                                    height={23} 
                                    alt="Add" 
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 p-10">
                    <div className="flex gap-2 items-center">
                        <span className="px-2 uppercase whitespace-nowrap text-[#bcbcbc] 
                        text-sm font-medium border border-[#fff6]"
                        >
                            U/A 13+
                        </span>
                        <span className="text-[#bcbcbc] border border-[#fff6] rounded-[3px]
                        text-xs px-1.5">
                            HD
                        </span>
                    </div>
                    <p className="text-base leading-[26px] text-white">
                        {movieData?.description}
                    </p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    );
};

export default MovieInfoModal;
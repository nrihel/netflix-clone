import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clsx } from "cn";
import Image from "next/image";
import ReactPlayer from "react-player";

interface IRecommendedMovieModalProps {
    isRecommendedMovieModalOpen: boolean;
    setIsRecommendedMovieModalOpen: (open: boolean) => void;
    recommendedMovie: IRecommendedMovie | null;
    movies: IMovie[];
}

const RecommendedMovieModal = ({
    isRecommendedMovieModalOpen,
    setIsRecommendedMovieModalOpen,
    recommendedMovie,
    movies,
}: IRecommendedMovieModalProps) => {
    const [playingMovie, setPlayingMovie] = useState<IMovie | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
    const names = Array.isArray(recommendedMovie?.recommendation)
        ? recommendedMovie.recommendation
        : [];

    const filterRecommendedMovie = movies.filter((movie) =>
        names.some(
        (title) =>
        title.toLowerCase() === movie.title.toLowerCase()
        )
    );

    const handlePlayMovie = async (movie: IMovie) => {
        if (!movie.trailerKey) return;

        setPlayingMovie(movie);
        setIsPlaying(true);

        try {
            await playerContainerRef.current?.requestFullscreen();
        } catch (error) {
            console.error("Fullscreen error:", error);
            setIsPlaying(false);
            setPlayingMovie(null);
        }
    };

    return ( 
    <Dialog 
        open={isRecommendedMovieModalOpen}
        onOpenChange={() => setIsRecommendedMovieModalOpen(false)}
        >
            <DialogContent className="w-[95vw] max-w-[900px]! max-h-[85vh] overflow-y-auto px-6 py-8 bg-[#181818] border-none">
                <DialogHeader className="flex gap-0">
                    <DialogTitle className="mb-4 text-2xl font-medium text-white flex item-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        RecommendedMovies
                    </DialogTitle>
                    <DialogDescription className="text-[#999999]">
                        {recommendedMovie?.reason}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {playingMovie?.trailerKey && (
                    <div
                        ref={playerContainerRef}
                        className="absolute w-px h-px overflow-hidden
                            fullscreen:w-screen fullscreen:h-screen
                            fullscreen:bg-black"
                        onFullscreenChange={() => {
                            if (!document.fullscreenElement) {
                            setIsPlaying(false);
                            setPlayingMovie(null);
                            }
                        }}
                        >
                        {playingMovie?.trailerKey && (
                            <ReactPlayer
                            src={`https://www.youtube.com/watch?v=${playingMovie.trailerKey}`}
                            playing={isPlaying}
                            onPlaying={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                            controls
                            width="100%"
                            height="100%"
                            />
                        )}
                    </div>
                    )}
                    {filterRecommendedMovie.map((recommendedMovie, index) => (
                        <div key={recommendedMovie.id} className="flex gap-3.5 border-b border-[#404040] rounded-sm
                        p-8 items-center cursor-pointer"
                        onMouseEnter={() => setSelectedMovie(recommendedMovie)}
                        onMouseLeave={() => setSelectedMovie(null)}
                        onClick={() => handlePlayMovie(recommendedMovie)}
                        >
                            <div className="text-[#d2d2d2] text-2xl">{index + 1}</div>
                            <div className="relative cursor-pointer">
                                {selectedMovie?.id === recommendedMovie.id ? (
                                    <div className="playIcon absolute inset-0 flex items-center justify-center">
                                        <div className="bg-[#1e1e1480] border border-white rounded-4xl h-12 p-2
                                        w-12 flex items-center justify-center"
                                        >
                                            <Image 
                                                src="/assets/play-medium.svg"
                                                width={30}
                                                height={30}
                                                alt="Play movie"
                                            />
                                        </div>
                                    </div>
                                ) : null}
                                <Image 
                                    className="object-cover rounded-sm min-w-[200px] max-h-[112]"
                                    src={recommendedMovie.thumbnailUrl}
                                    width={200}
                                    height={112}
                                    alt={recommendedMovie.title}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">
                                        {recommendedMovie.title}
                                    </span>
                                    <span className="text-white text-base">
                                        {recommendedMovie.duration}
                                    </span>
                                </div>
                                <p className="mt-2 text-[#d2d2d2] text-sm">{recommendedMovie.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendedMovieModal;
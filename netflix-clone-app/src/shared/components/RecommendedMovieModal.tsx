import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { clsx } from "cn";

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
    const [isMoviePlaying, setIsMoviePlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const filterRecommendedMovie = movies.filter((movie) => {
        return recommendedMovie?.recommendation.some(
            (recommendation) => recommendation.id === movie.id
        );
    });

    return ( 
    <Dialog 
        open={isRecommendedMovieModalOpen}
        onOpenChange={() => setIsRecommendedMovieModalOpen(false)}
        >
            <DialogContent className="min-w-[850px] px-12 py-8 bg-[#181818] border-none">
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
                    <video ref={videoRef} className={clsx({ hidden: !isMoviePlaying })} />
                    {filterRecommendedMovie.map((recommendedMovie, index) => (
                        <div key={recommendedMovie.id} className="flex gap-3.5 border-b border-[#404040] rounded-sm
                        p-8 items-center cursor-pointer"
                        >
                            <div className="text-[#d2d2d2]">{index + 1}</div>
                            <div className="relative cursor-pointer">

                            </div>
                    </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendedMovieModal;
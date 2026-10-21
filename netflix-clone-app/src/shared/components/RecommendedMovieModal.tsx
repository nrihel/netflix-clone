import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Sparkles } from "lucide-react";

interface IRecommendedMovieModalProps {
    isRecommendedMovieModalOpen: boolean;
    setIsREcommendedMovieModalOpen: (open: boolean) => void;
    recommendedMovie: IRecommendedMovie | null;
    movies: IMovie[];
}

const RecommendedMovieModal = ({
    isRecommendedMovieModalOpen,
    setIsREcommendedMovieModalOpen,
    recommendedMovie,
    movies,
}: IRecommendedMovieModalProps) => {
    return ( 
    <Dialog 
        open={isRecommendedMovieModalOpen}
        onOpenChange={() => setIsREcommendedMovieModalOpen(false)}
        >
            <DialogContent className="min-w-[850px] px-12 py-8 bg-[#181818] border-none">
                <DialogHeader className="flex gap-0">
                    <DialogTitle className="mb-4 text-2xl font-medium text-white flex item-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        RecommendedMovies
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendedMovieModal;
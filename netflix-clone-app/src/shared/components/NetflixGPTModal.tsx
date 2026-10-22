import { Film } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter
} from "../ui/Dialog";
import { Slider } from "../ui/Slider";
import { useEffect, useState } from "react";
import { GENRES, MOODS } from "@/constants";
import { Badge } from "../ui/Badge";
import {GoogleGenAI} from "@google/genai";
import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import axios from "axios";
import RecommendedMovieModal from "./RecommendedMovieModal";

interface INetflixGPTModalProps {
    isNetflixGPTModalOpen: boolean;
    setIsNetflixGPTModalOpen: (isOpen: boolean) => void;
}

const NetflixGPTModal = ({
    isNetflixGPTModalOpen, 
    setIsNetflixGPTModalOpen,
    }: INetflixGPTModalProps) => {
        const [duration, setDuration] = useState<number[]>([10]);
        const [rating, setRating] = useState<number[]>([6]);
        const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
        const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
        const [movies, setMovies] = useState<IMovie[]>([]);
        const [recommendedMovie, setRecommendedMovie] = 
            useState<IRecommendedMovie | null>(null);
        const [isRecommendedMovieModalOpen, setIsRecommendedMovieModalOpen] = 
            useState(false);

        const toggleMood = (mood: string) => {
            setSelectedMoods((prev) =>
                prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
            );
        };

        const toggleGenre = (genre: string) => {
            setSelectedGenres((prev) => 
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
            );
        };

        const handleRecommendedMovie = async () => {
            try {
                const ai = new GoogleGenAI({
                    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
                });

                const model = "gemini-3.5-flash-lite"

                const preferences = {
                    genre: selectedGenres,
                    minDuration: duration[0],
                    minRating: rating[0],
                    mood: selectedMoods,
                };

                const contents = [
                    {
                        role: "user",
                        parts: [{ text: `You are a movie recommendation assistant.  Here is a list of movies: ${JSON.stringify(
                            movies,
                            null,
                            2
                        )}
                        User preferences: ${JSON.stringify(preferences, null, 2)}
                        Task:
                        - Recommend 3 different movies from the provided list that best match the user's preferences.
                        - Return valid JSON in this exact format:
                            {
                            "recommendation": ["Movie Title 1", "Movie Title 2", "Movie Title 3"],
                            "reason": "Briefly explain your choices"
                            }

                        - Use exact movie titles from the provided list.
                        `,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            contents,
        });

        const text = 
        response?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .join("/n") || "no response";

        const cleanedText = text.replace(/```json\s*|\s*```/g, "")
        const output = JSON.parse(cleanedText);
        console.log("Gemini response:", output);

        setRecommendedMovie(output);
        setIsRecommendedMovieModalOpen(true);
        } catch (error) {
            console.log(error);
        };
    };
 
    const fetchMovies = async () => {
        try {
            const {data} = await axios.get("/api/movies")
            setMovies(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            <Dialog 
                open={isNetflixGPTModalOpen} 
                onOpenChange={() => setIsNetflixGPTModalOpen(false)}
            >
                <DialogContent className="bg-[#1a1a1a] max-w-2xl! w-full gap-10
                overflow-y-auto text-white border-[#333333]">
                    <DialogHeader>
                        <DialogTitle className="mb-2 flex gap-2 items-center text-2xl font-bold">
                            <Film className="w-6 h-6 text-[#ff0000]" />
                            Find Your Perfect Movie
                        </DialogTitle>
                        <DialogDescription className="text-[#999999]">
                            Adjust your preferences to get the best recommendations.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 flex-col">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-[#f2f2f2]">Duration Range</label>
                                <span className="text-wm text-[#999]">{duration[0]} min</span>
                            </div>
                            <Slider 
                                max={15} 
                                step={0.5} 
                                value={duration} 
                                onValueChange={(value) =>
                                    setDuration(Array.isArray(value) ? [...value] : [value])
                                }
                            />
                        </div>
                        <div className="flex gap-4 flex-col">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-[#f2f2f2]">
                                    Minimum Rating
                                </label>
                                <span className="text-wm text-[#999]">{rating[0]}/15</span>
                            </div>
                            <Slider 
                                max={15} 
                                step={0.5} 
                                value={rating} 
                                onValueChange={(value) =>
                                    setRating(Array.isArray(value) ? [...value] : [value])
                                } 
                            />
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            <label className="text-sm font-semibold text-[#f2f2f2]">
                                Select Mood
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {MOODS.map((mood) => (
                                    <Badge 
                                        key={mood}
                                        className="cursor-pointer chip-hover px-4 py-2 text-sm pt-2 pb-2"
                                        variant={selectedMoods.includes(mood) ? "default" : "outline"
                                        }
                                        onClick={() => toggleMood(mood)}
                                        >
                                        {mood}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-0">
                            <label className="text-sm font-semibold text-[#f2f2f2]">
                                Select Genres
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => (
                                    <Badge 
                                        key={genre}
                                        className="cursor-pointer chip-hover px-4 py-2 text-sm pt-2 pb-2"
                                        variant={selectedGenres.includes(genre) ? "default" : "outline"
                                        }
                                        onClick={() => toggleGenre(genre)}
                                        >
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex gap-6 bg-[#1a1a1a]">
                        <button 
                         className="cursor-pointer bg-[#141414] font-medium text-sm py-2 px-4 
                        border border-[#262626] rounded-md">
                            Cancel
                        </button>
                        <button 
                         className="cursor-pointer bg-[#ff0000] glow-red font-medium text-sm py-2 px-4 
                        rounded-[10px]"
                        onClick={handleRecommendedMovie}
                        >
                            Get Recommendations
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {isRecommendedMovieModalOpen ? (
                <RecommendedMovieModal
                isRecommendedMovieModalOpen={isRecommendedMovieModalOpen}
                setIsRecommendedMovieModalOpen={setIsRecommendedMovieModalOpen}
                recommendedMovie={recommendedMovie}
                movies={movies}
            /> 
            ) : null}
        </>
    );
};

export default NetflixGPTModal;
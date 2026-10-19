"use client";

import Image from "next/image";
import { IMovie } from "@/types/movie.types";
import { useRef, useState } from "react";
import MoviePopup from "./MoviePopup";

const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
    const [movieData, setMovieData] = useState<IMovie | null>(null);
    const [movieID, setMovieId] = useState<number | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const [popupPosition, setPopupPosition] = useState({
        left: 0,
        top: 0,
    });

    const handleMouseEnter = (
        movie: IMovie,
        element: HTMLDivElement
        ) => {
        if (!rowRef.current) return;

        const thumbnail = element.getBoundingClientRect();
        const row = rowRef.current.getBoundingClientRect();

        setMovieData(movie);
        setMovieId(movie.id);

        setPopupPosition({
            left: thumbnail.left - row.left,
            top: thumbnail.top - row.top,
        });
    };

    const handleMouseLeave = () => {
        setMovieId(null);
    }

    return (
        <div className="flex flex-col gap-2 relative my-[3vw] px-[5%]">
            {movies.length ? <h2 className="text-[#e5e5e5] font-medium text-xl">{label}</h2> : null}
            <div className="flex items-center gap-2">
                <button
                        onClick={() => scrollRef.current?.scrollBy({
                        left: -500,
                        behavior: "smooth",
                        })}
                        className="relative shrink-0 bg-white rounded-full px-2 
                            cursor-pointer z-[60]"
                    >
                        ❮
                    </button>
                    <div ref={rowRef} className="relative flex-1 min-w-0" 
                        onMouseLeave={handleMouseLeave}>
                        
                        <div ref={scrollRef} className="flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar">
                            {movies.map((movie) => (
                            <div key={movie.id} className="relative cursor-pointer shrink-0" 
                            onMouseEnter={(e) => handleMouseEnter(movie, e.currentTarget)}
                            >
                                <div className="relative cursor-pointer w-[250px] h-[140px] 
                                rounded-sm transition duration-300 ease-in-out">
                                    <Image
                                        src={movie.thumbnailUrl}
                                        className="object-cover"
                                        alt={movie.title}
                                        fill 
                                    />
                                </div>
                            </div>
                            ))}
                        </div>
                        {movieData && movieID !== null && (
                        <div
                            className="absolute z-50"
                            style={{
                            left: popupPosition.left,
                            top: popupPosition.top,
                            }}
                        >
                            <MoviePopup movie={movieData} />
                        </div>
                        )}
                    </div>
                <button
                    onClick={() => scrollRef.current?.scrollBy({
                    left: 500,
                    behavior: "smooth",
                    })}
                    className="relative bg-white rounded-full cursor-pointer px-2 z-[60]"
                >
                    ❯
                </button>
            </div>
        </div>
    );
};

export default Movies;
"use client";

import Image from "next/image";
import { IMovie } from "@/types/movie.types";

const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
    return (
    <div className="flex flex-col gap-2 relative my-[3vw] px-[4%]">
        {movies.length ? <h2>{label}</h2> : null}
        <div className="flex gap-2">
            {movies.map((movie) => (
                <div key={movie._id} className="relative cursor-pointer">
                    <div className="relative cursor-pointer w-[250px] h-[140px] 
                    rounded-sm transition duration-300 ease-in-out">
                        <Image
                            src={movie.thumbnailUrl || "/assets/placeholder.png"}
                            alt={movie.title || "Movie poster"}
                            width={700}
                            height={350}
                            className="w-full h-[350px] object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Movies;
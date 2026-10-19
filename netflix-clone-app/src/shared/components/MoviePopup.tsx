import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import { useRef } from "react";

const MoviePopup = ({ movie }: {movie: IMovie }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    return (
        <div className="absolute -left-8 w-80 z-10 -top-16 rounded-md text-base
        transition scale-75 hover:scale-100 hover:-translate-y-6 transition-transform
        duration-300 ease-in-out"
        >
            <video ref={videoRef} src={movie.videoUrl} poster={movie.thumbnailUrl} />
            <div className="relative w-80 h-[140px]">
                <Image
                    className="object-cover"
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                />
            </div>
        </div>
    );
};

export default MoviePopup;
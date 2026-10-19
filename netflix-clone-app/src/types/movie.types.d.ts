interface IMovie {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    genre: string;
    duration: string;
    rating: number;
    mood: string;
    trailerKey?: string | null;
}

export { IMovie };
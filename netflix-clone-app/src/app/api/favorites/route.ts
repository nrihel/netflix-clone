import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
        try {
            await connectToDB();
            const { currentUser } = await serverAuth();
            
            const user = await User.findOne({ 
                email: currentUser.email,
            }).populate("favorites"); 

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            );

            if (!response.ok) throw new Error("TMDB request failed");

            const data = await response.json();
            const movieId = user.favorites;
            const favorites = await Promise.all(
    data.results.map(async (movie: any) => {    
        const userFavorite = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
            );
    )
        const movieDetails = await userFavorite.json();
            
        const favoriteMovie = {
        id: movieDetails.id,
        title: movieDetails.title,
        description: movieDetails.overview,
        thumbnailUrl: movieDetails.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
            : "",
    };

        return NextResponse.json(
            {favorites: [favoriteMovie]}, 
            { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
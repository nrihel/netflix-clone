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
                }); 

                const favorites = await Promise.all(
    user.favorites.map(async (movieId: number) => {    
        const userFavorite = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
        );
    
        const movieDetails = await userFavorite.json();
            
        const favoriteMovie = {
        id: movieDetails.id,
        title: movieDetails.title,
        description: movieDetails.overview,
        thumbnailUrl: movieDetails.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
            : "",
        }
        return favoriteMovie;
    })
);
        return NextResponse.json(
            { favorites }, 
            { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
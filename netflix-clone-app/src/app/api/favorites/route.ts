import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();

        await connectToDB();

        const user = await User.findOne({ 
            email: currentUser.email,
        }).populate("favorites"); 


        const movieId = user.favorites[0];
        
        const userFavorite = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
            );
        const movieDetails = await userFavorite.json();
            
        return {
        id: movieDetails.id,
        title: movieDetails.title,
        description: movieDetails.overview,
        thumbnailUrl: movieDetails.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
            : "",
        };
    
        return NextResponse.json(
            {favorites: user.favorites}, 
            { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
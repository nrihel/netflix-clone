import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/Movies";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        await serverAuth();

        const response = await fetch(
                'https://api.themoviedb.org/3/movie/popular?api_key={process.env.TMDB_API_KEY}&language=en-US'
        );

        if (!response.ok) throw new Error("TMDB request failed");

        const data = await response.json();

        return NextResponse.json(data.results, { status: 200 });
    }   catch (error) {
        console.log(error);
        return NextResponse.json(
            {message: "Failed to fetch movies"}, 
            { status: 500 }
        );
    }
}
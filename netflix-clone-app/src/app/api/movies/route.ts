import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        await serverAuth();

        const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );

        if (!response.ok) throw new Error("TMDB request failed");

        const data = await response.json();

        const movies = await Promise.all(
  data.results.map(async (movie: any) => {
    const trailerResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    let trailerKey = null;

    if (trailerResponse.ok) {
      const trailerData = await trailerResponse.json();
      const trailer = trailerData.results.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      trailerKey = trailer?.key ?? null;
    }

    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      thumbnailUrl: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",
      trailerKey,
    };
  })
);

        return NextResponse.json(movies, { status: 200 });
    }   catch (error) {
        console.log(error);
        return NextResponse.json(
            {message: "Failed to fetch movies"}, 
            { status: 500 }
        );
    }
}
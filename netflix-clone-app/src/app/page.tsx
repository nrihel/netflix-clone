"use client"
import Billboard from "@/shared/components/Billboard";
import FavoriteList from "@/shared/components/FavoriteList";
import MovieList from "@/shared/components/MovieList";
import Navbar from "@/shared/components/Navbar";
import useUser from "@/stores/user.store"
import { useEffect } from "react"

export default function Home() {
  const {updateUser } = useUser();

  useEffect(() => {
    updateUser();
  }, [updateUser]);
  
  return (
    <div>
    <Navbar />
    <Billboard />
    <MovieList />
    <FavoriteList />
    </div>
  );
}

import useUser from "@/stores/user.store";
import { useEffect, useRef } from "react";
import Movies from "./Movies";

const FavoriteList = () => {
    const { favorites, updateFavorites } = useUser();

    useEffect(() => {
        updateFavorites();
    }, [updateFavorites]);
    
    return (
    <div className="my-8">
        <Movies movies={favorites} label="My List" />
    </div>
    );
};


export default FavoriteList;
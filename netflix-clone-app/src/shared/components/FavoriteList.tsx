import useUser from "@/stores/user.store";
import { useEffect } from "react";
import Movies from "./Movies";

const FavoriteList = () => {
    const { favorites, updateFavorites } = useUser();
    console.log(favorites);

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
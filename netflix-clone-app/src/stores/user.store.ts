import { IMovie } from "@/types/movie.types";
import { User } from "@/types/user.types"
import axios from "axios";
import { create } from "zustand"

type IState = {
    user: User | null;
    favorites: IMovie[],
};

type IActions = {
    updateUser: () => void;
    updateFavorites: () => void;
};

type IUserStoresState = IState & IActions;

const useUser = create<IUserStoresState> ((set) => ({
    user: null,
    favorites: [],
    updateUser: async () => {
        const { data } = await axios.get("/api/me")
        const {currentUser} = data;
        set({user: currentUser})
    },
    updateFavorites: async () => {
        const {data} = await axios.get("/api/favorites");
        set({ favorites: data.favorites });
    },
}));

export default useUser;

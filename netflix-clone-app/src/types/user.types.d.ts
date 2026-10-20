interface User {
    name: string,
    email: string,
    image?: string,
    favorites: string[] | number[] | any[],
}

export { User };
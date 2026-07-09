export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async({query}:{query:string}) => {

    console.log("API KEY =", TMDB_CONFIG.API_KEY);

    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    console.log("Endpoint =", endpoint);

    const res = await fetch(endpoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })

    console.log("Status =", res.status);

    if(!res){
        throw new Error('Failed to fetch movies',res)
    }

    const data = await res.json()

    console.log(data);

    return data.results
}


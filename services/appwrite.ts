// track serches made by user
import {Client, Databases, Query,ID} from "react-native-appwrite"

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID

const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async(query: string, movie: Movie) => {
    
    try{

    const result = await database.listDocuments(DATABASE_ID,"metrics",[
        Query.equal('searchTerm',query)
    ])

    console.log(result)

    if(result.documents.length > 0){
        const exisitingMovie = result.documents[0]

        await database.updateDocument(
            DATABASE_ID,
            "metrics",
            exisitingMovie.$id,
            {
                count: exisitingMovie.count + 1
            }
        )

    }else{
        await database.createDocument(DATABASE_ID,"metrics",ID.unique(),{
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
             
        })
    }
  }catch(err){
    console.log("Update search count error:", err)
    throw err
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {

    try{

        const result = await database.listDocuments(DATABASE_ID,"metrics",[
        Query.limit(5),
        Query.orderDesc('count'),
    ])

    return result.documents as unknown as TrendingMovie[]


    }catch(err){
        console.log(err)
        throw undefined
    }

}
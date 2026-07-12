import { database, account } from "./appwrite";
import { ID, Query } from "react-native-appwrite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = "saved_movie";


// Save Movie

export const saveMovie = async (movie: any) => {

    try {

         console.log("Saving movie:", movie);

        const user = await account.get();

        console.log("Current user:", user.$id);


        const response = await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                userId: user.$id,
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                rating: movie.vote_average,
                releaseDate: movie.release_date
            }
        );

         console.log("Saved document:", response);

        return response;


    } catch (error) {

        console.log("Save movie error:", error);
        throw error;

    }

};


// Check Movie Saved

export const checkSavedMovie = async (movieId: number) => {

    try {

        const user = await account.get();


        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal("userId", user.$id),
                Query.equal("movieId", movieId)
            ]
        );


        return result.documents.length > 0;


    } catch (error) {

        console.log("Check saved movie error:", error);

        return false;

    }

};


// Remove Saved Movie

export const removeMovie = async (movieId:number) => {

    try {

        const user = await account.get();


        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal("userId", user.$id),
                Query.equal("movieId", movieId)
            ]
        );



        if(result.documents.length > 0){

            await database.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                result.documents[0].$id
            );

        }


    } catch(error){

        console.log("Remove movie error:", error);

        throw error;

    }

};



// Get User Saved Movies

export const getSavedMovies = async () => {

    try {

        const user = await account.get();


        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal(
                    "userId",
                    user.$id
                ),

                Query.orderDesc("$createdAt")
            ]
        );


        return result.documents;


    } catch(error){

        console.log("Get saved movies error:", error);

        return [];

    }

};
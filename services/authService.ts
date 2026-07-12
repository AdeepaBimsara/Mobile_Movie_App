import { ID } from "react-native-appwrite";
import { account } from "./appwrite";


export const registerUser = async(
    name:string,
    email:string,
    password:string
)=>{

    try{

        const user = await account.create(
            ID.unique(),
            email,
            password,
            name
        );


        return user;


    }catch(error){

        console.log(error);
        throw error;

    }

}




export const loginUser = async(
    email:string,
    password:string
)=>{


    try{

        const session =
        await account.createEmailPasswordSession(
            email,
            password
        );


        return session;


    }catch(error){

        console.log(error);
        throw error;

    }

}

export const getCurrentUser = async()=>{

    try{

        const user = await account.get();

        console.log("CURRENT USER :", user);

        return user;


    }catch(error){

        console.log(error);
         console.log("GET USER ERROR :", error);

    }

}
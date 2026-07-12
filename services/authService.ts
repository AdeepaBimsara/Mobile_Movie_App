import { ID } from "react-native-appwrite";
import { account } from "./appwrite";
import { router } from "expo-router";


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

    //     try{
    //   const currentUser = await account.get();
    //   return currentUser;
    //     }catch(err){
    //         console.log("current user: ",err);
            
    //     }

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
        console.log("getCurrentUser called");

        const user = await account.get();

        console.log("CURRENT USER :", user);

        return user;


    }catch(error){

        console.log(error);
         console.log("GET USER ERROR :", error);
         return null

    }

}

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("Logged out successfully");
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    throw error;
  }
};
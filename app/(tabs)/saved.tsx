import { View, Text, Image, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { getSavedMovies, removeMovie} from "@/services/ saveService";

const saved = () => {

const [movies, setMovies] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

const loadMovies = async()=>{

    const data = await getSavedMovies();

    setMovies(data);

    setLoading(false);

}

const handleRemove = async(movieId:number)=>{

  Alert.alert(
    "Remove Movie",
    "Are you sure you want to remove this movie from saved list?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async()=>{

          try{

            await removeMovie(movieId);

            Alert.alert(
              "Removed",
              "Movie removed from your saved list"
            );

            loadMovies();

          }catch(error){

            console.log(error);

            Alert.alert(
              "Error",
              "Failed to remove movie"
            );

          }

        }
      }
    ]
  );


  }

useEffect(()=>{
  
  loadMovies();

},[]);

 if (loading) {
  return (
    <View className="flex-1 bg-slate-950 items-center justify-center">
        <ActivityIndicator
        size="large"
        color="#9333EA"
        className="mt-6"
      />
    </View>
  );
}



  return (
    <View className="flex-1 bg-primary">


      {/* Background */}
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />


      {/* Dark Overlay */}
      <View className="absolute w-full h-full bg-black/60" />


      <View className="flex-1 px-5 pt-14">


        {/* Header */}
        <View className="mb-8">

          <Text
            className="
            text-white
            text-4xl
            font-bold
            "
          >
            Saved
          </Text>

          <Text
            className="
            text-gray-300
            text-base
            mt-2
            "
          >
            Your favorite movies collection
          </Text>

        </View>



        <FlatList

         data={movies}

          keyExtractor={(item)=>item.$id}

          showsVerticalScrollIndicator={false}


          renderItem={({item})=>(


            <TouchableOpacity
              activeOpacity={0.8}
              className="
              flex-row
              bg-white/10
              rounded-3xl
              p-4
              mb-5
              border
              border-white/20
              "
            >


              {/* Poster */}
              <Image

              source={{
                  uri:`https://image.tmdb.org/t/p/w500${item.posterPath}`
                }}

                className="
                w-28
                h-40
                rounded-2xl
                "

                resizeMode="cover"

              />



              {/* Details */}
              <View
                className="
                flex-1
                ml-5
                justify-center
                "
              >


                <Text
                  className="
                  text-white
                  text-xl
                  font-bold
                  "
                  numberOfLines={2}
                >
                  {item.title}
                </Text>



                {/* Rating */}
                <View
                  className="
                  mt-4
                  bg-yellow-500/20
                  self-start
                  px-4
                  py-2
                  rounded-full
                  "
                >

                  <Text
                    className="
                    text-yellow-400
                    font-bold
                    "
                  >
                    ⭐ {item.rating}
                  </Text>


                </View>



                {/* Remove Button */}

                <TouchableOpacity
                  onPress={()=>handleRemove(item.movieId)}

                  className="
                  mt-5
                  bg-red-500/20
                  px-4
                  py-2
                  rounded-full
                  self-start
                  "
                >

                  <Text
                    className="
                    text-red-400
                    font-semibold
                    "
                  >
                    Remove
                  </Text>

                </TouchableOpacity>



              </View>


            </TouchableOpacity>


          )}

        />


      </View>


    </View>
  );
};

export default saved;
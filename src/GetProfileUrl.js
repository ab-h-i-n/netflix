import { useContext, useEffect, useState } from "react";
import { supabase } from "./SupaBase";
import { UserContext } from "./UserContext";

const timestamp = new Date().getTime();

export const useProfileUrl = () => {

  const user = useContext(UserContext);


    const fetchProfileUrl = async () => {
      try {
        const isFileExists = await checkFileExists();
        const url = isFileExists
          ? getPublicUrl(user.id)
          : "/assets/profile-circle-icon.png";
        return(url);
      } catch (error) {
        console.error("Error fetching profile URL:", error);
        return("/assets/profile-circle-icon.png");
      }
    };

    async function checkFileExists() {
        try {
          const { data, error } = await supabase.storage
            .from("photo")
            .list(`${user.id}`);
      
          if (error) {
            console.error("Error listing path:", error.message);
            return false;
          }
      
          return (data[0].name === "profile" ? true : false);
        } catch (error) {
          console.error("Error checking file existence:", error.message);
          return false;
        }
      }
      
      function getPublicUrl(userId) {
        try {
          const { data, error } = supabase.storage
            .from("photo")
            .getPublicUrl(`${userId}/profile`);
      
          if (error) {
            console.error("Error getting public URL:", error.message);
            return "/assets/profile-circle-icon.png";
          }
      
          return data?.publicUrl + "?" + timestamp;
        } catch (error) {
          console.error("Error getting public URL:", error.message);
          return "/assets/profile-circle-icon.png";
        }
      }
      

  return {
    fetchProfileUrl
  }
};


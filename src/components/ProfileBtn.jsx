import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { supabase } from "../SupaBase";

const ProfileBtn = () => {
  const user = useContext(UserContext);
  const timestamp = new Date().getTime();
  const [dp, setDp] = useState("/assets/profile-circle-icon.png");

  const getProfileUrl = () => {
    // Get public URL of the uploaded image
    const { data: url, error: urlError } = supabase.storage
      .from("photo")
      .getPublicUrl(`${user.id}/profile`);
    setDp(url?.publicUrl + "?" + timestamp);
  };

  useEffect(() => {
    getProfileUrl();
  }, []);

  return (
    <Link to={"/profile"} className="bg-zinc-600 overflow-hidden w-10 h-10 lg:w-14 lg:h-14 rounded-full">
      <img
        src={dp}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
    </Link>
  );
};

export default ProfileBtn;

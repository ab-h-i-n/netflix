import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupaBase";

const AccountPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [isBioEditable, setBioEditable] = useState(false);
  const [bio, setBio] = useState();
  const bioField = useRef();
  const [dp, setDp] = useState("/assets/profile-circle-icon.png");

  const [userDetails, setUserDetails] = useState();

  const insertData = async () => {
    try {
      setBio(bioField.current.value);
      console.log(bio);
      console.log(user.id);

      const { error } = await supabase
        .from("UserData")
        .update({ bio: bioField.current.value })
        .eq("id", user.id);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("UserData")
      .select()
      .eq("id", user.id);

    setUserDetails(data);
  };

  const UserDataField = ({ title, value, children }) => {
    return (
      <div className="text-white p-3 bg-zinc-900 rounded min-w-[350px] lg:min-w-[500px]">
        <label htmlFor="email" className="font-semibold text-xs">
          {title}
        </label>
        <p className="font-bold">{value}</p>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <nav className="p-5">
        {/* backbutton  */}

        <button onClick={() => navigate(-1)}>
          <img src="/assets/chevron_left.svg" alt="back" className="w-7" />
        </button>
      </nav>

      <main>
        {/* image and name  */}

        <div className="grid place-content-center gap-y-3 relative">
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={(e) => setDp(URL.createObjectURL(e.target.files[0]))}
            className="absolute hidden"
          />
          <label htmlFor="photo">
            <img
              src={dp || URL.createObjectURL(dp)}
              alt="Profile"
              className="w-52 cursor-pointer"
            />
          </label>
          <p className="text-white font-semibold text-center p-2">
            {user?.user_metadata.full_name}
          </p>
        </div>

        <div className="px-5 mt-5 grid place-items-center gap-5">
          {/* email */}

          <UserDataField title={"User Email"} value={user?.email} />

          {/* bio */}
          <div className="relative">
            <UserDataField title={"Bio"} value={""}>
              <div className="grid">
                <textarea
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="5"
                  className="bg-transparent text-white outline-none border-none"
                  readOnly={!isBioEditable}
                  ref={bioField}
                  defaultValue={bio}
                ></textarea>

                <button
                  className={`text-zinc-950 bg-white rounded py-2 px-3 ${
                    isBioEditable ? "" : "hidden"
                  }`}
                  onClick={insertData}
                >
                  Save
                </button>
              </div>

              <button
                onClick={() => {
                  setBioEditable(!isBioEditable);
                }}
                className={`absolute top-2  right-2 ${
                  isBioEditable ? "bg-zinc-500" : ""
                } p-3 rounded-full`}
              >
                <img src="/assets/pencilBtn.svg" alt="edit" className="w-5" />
              </button>
            </UserDataField>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;

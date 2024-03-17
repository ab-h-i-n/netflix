import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupaBase";

const AccountPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditable, setEditable] = useState(false);
  const [dp, setDp] = useState("/assets/profile-circle-icon.png");
  const [userDetails, setUserDetails] = useState();

  const bioField = useRef();
  const nameField = useRef();

  const insertData = async () => {
    try {
      const { error } = await supabase
        .from("user_data")
        .update({ bio: bioField.current.value, name: nameField.current.value })
        .eq("id", user.id);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditable(false);
      fetchData();
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("user_data")
      .select()
      .eq("id", user.id);

    setUserDetails(data);

    console.log(data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="p-5">
        {/* backbutton  */}

        <button onClick={() => navigate(-1)}>
          <img src="/assets/chevron_left.svg" alt="back" className="w-7" />
        </button>
      </nav>

      <main className="realtive">
        {/* edit button  */}

        <button
          onClick={() => {
            setEditable(!isEditable);
          }}
          className={`z-[100] absolute top-5 right-5 lg:top-16 bg-zinc-900 hover:bg-zinc-800 px-3 py-3 lg:right-24 text-white flex font-semibold items-center gap-x-3 ${
            isEditable ? "hidden" : ""
          } p-3 rounded-full`}
        >
          <img src="/assets/pencilBtn.svg" alt="edit" className="w-5" />
          <span className="hidden lg:block">Edit Profile</span>
        </button>

        {/* image and name  */}

        <div className="grid place-content-center gap-y-3 relative">
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={(e) => setDp(URL.createObjectURL(e.target.files[0]))}
            className="absolute hidden"
          />
          <label
            htmlFor={`${isEditable ? "photo" : "null"}`}
            className="rounded-full cursor-pointer w-52 h-52 overflow-hidden relative"
          >
            <img
              src={dp || URL.createObjectURL(dp)}
              alt="Profile"
              className="object-cover w-52 h-52"
            />

            {/* pencil img  */}
            <img
              src="/assets/pencilBtn.svg"
              alt="Pencil"
              className={`absolute z-[50] top-[50%] left-[50%] w-10 translate-x-[-50%] translate-y-[-50%] ${
                isEditable ? "" : "hidden"
              } `}
            />
          </label>

          {/* user name  */}

          <div className={`relative rounded ${isEditable && "bg-zinc-900"}`}>
            <input
              type="text"
              name="name"
              id="name"
              className="text-white font-semibold text-center p-2 bg-transparent outline-none"
              defaultValue={userDetails?.[0]?.name}
              readOnly={!isEditable}
              ref={nameField}
            />

            {/* pencil img  */}
            <img
              src="/assets/pencilBtn.svg"
              alt="Pencil"
              className={`absolute z-[50] top-2 right-2 w-5 ${
                isEditable ? "" : "hidden"
              } `}
            />
          </div>
        </div>

        <div className="px-5 mt-5 grid place-items-center gap-5">
          {/* email */}

          <UserDataField title={"User Email"} value={user?.email} />

          {/* bio */}

          <div className="relative">
            <UserDataField title={"Bio"} value={""}>
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="5"
                className="bg-transparent text-white outline-none border-none"
                readOnly={!isEditable}
                ref={bioField}
                defaultValue={userDetails?.[0]?.bio || ""}
              ></textarea>
              <img
                src="/assets/pencilBtn.svg"
                alt="Pencil"
                className={`absolute top-2 right-2 w-5 ${
                  isEditable ? "" : "hidden"
                } `}
              />
            </UserDataField>
          </div>

          {/* buttons  */}

          <div className="flex gap-x-5">
            {/*Cancel button */}

            <button
              className={`text-zinc-100 bg-red-600 min-w-40 lg:min-w-60 rounded py-2 px-3 ${
                isEditable ? "" : "hidden"
              }`}
              onClick={() => {
                setEditable(false);
                window.location.reload();
              }}
            >
              Cancel
            </button>

            {/* Save button  */}

            <button
              className={`text-zinc-100 bg-red-600 min-w-40 lg:min-w-60 rounded py-2 px-3 ${
                isEditable ? "" : "hidden"
              }`}
              onClick={insertData}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;

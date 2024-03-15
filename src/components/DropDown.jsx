import React from "react";

const DropDown = ({ isFavOpen, setFavOpen }) => {
  return (
    <>
      <details onClick={() => setFavOpen(!isFavOpen)} className="cursor-pointer">
        <summary className="p-3 min-w-40 lg:min-w-48 hover:bg-[#7a7a7a33] rounded flex justify-between items-center">
          <div className="flex gap-3 items-center ">
            <img src="/assets/favorites.svg" alt="fav" className="w-6 lg:w-8" />
            <span className="text-lg">Favorites</span>
          </div>

          <img
            src="/assets/chevron_up.svg"
            alt="fav"
            className={`w-5 lg:w-7 ${
              isFavOpen ? "rotate-180" : ""
            } transition-all delay-100`}
          />
        </summary>

        {/* favorite list  */}

        <p className="absolute bg-zinc-900 p-3 rounded mr-5 lg:translate-x-[-130px]">
          {/* list items  */}
          Hello hello hell o Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Laudantium voluptas neque eligendi? Dolorem voluptatum incidunt
          quae et magni labore saepe, nulla fugiat aut aspernatur. Explicabo
          ratione odio qui doloribus eos?
        </p>
      </details>
    </>
  );
};

export default DropDown;

import React, { useState } from "react";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState("");

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center m-4">
          GitHub user's favourite programming language!
        </h2>

      </div>
    </>
  );
};

export default SearchUser;

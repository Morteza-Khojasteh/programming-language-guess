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
        <form autoComplete="on" >
          <div className="row no-gutters">
            <div className="col">
              <input
                className="form-control border-secondary border-right-0 rounded-0"
                placeholder="Github Username"
                id="example-search-input4"
              />
              <span
                id="searchclear"
                className="glyphicon glyphicon-remove-circle"
              ></span>
            </div>

            <div className="col-auto">
              <button
                className="btn btn-outline-secondary border-left-0 rounded-0 rounded-right"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchUser;

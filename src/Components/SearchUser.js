import React, { useState } from "react";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [result, setResult] = useState("");

  // get username from input
  const onChangeHandler = (e) => {
    setUserName(e.target.value.trim());
    setResult("");
  };

  // get user data from github api with username
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
      .then((response) => {
        return response.json();
      })
      //  all user repositories data
      .then((githubUserData) => {
        // when username not found
        setResult(githubUserData.message);
        findLanguages(githubUserData);
        favoriteLanguage(allLanguages);
      });
  };

  // list of all languages from all repositories for specific username
  let allLanguages = [];

  // find all languages for specific username
  const findLanguages = (userData) => {
    userData.filter((item) => {
      if (item.language !== null) {
        allLanguages.push(item.language);
      }
      return item;
    });
  };

  // find favorite language for specific username
  const favoriteLanguage = (allLanguages) => {
    // how many times each language appears in allLanguages Array
    if (allLanguages.length > 0) {
      const uniqueLanguages = allLanguages.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
        return acc;
      }, {});

      // find the most popular language with number of values
      const userFavoriteLanguage = Object.keys(uniqueLanguages).reduce((a, b) =>
        uniqueLanguages[a] > uniqueLanguages[b] ? a : b
      );
      setResult(userFavoriteLanguage);
      
    } else {
      // if the length of allLanguages is 0
      setResult("Can't guess any languages!!");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center m-4">
          <div className="title">
            GitHub user's favourite programming language!
          </div>
        </h2>
        <form autoComplete="on" onSubmit={onSubmitHandler}>
          <div className="row no-gutters">
            <div className="col">
              <input
                className="form-control border-secondary border-right-0 rounded-0"
                placeholder="Github Username"
                onChange={onChangeHandler}
                id="example-search-input4"
              />
              <span
                id="searchclear"
                className="glyphicon glyphicon-remove-circle"
              ></span>
            </div>

            <div className="col-auto">
              <button
                className="btn btn-outline-dark font-weight-bold border-left-0 rounded-0 rounded-right"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLongTitle">
                  We guess your favourite programming language is
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center text-primary">
                {result !== "" ? (
                  <h3>{result}</h3>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;

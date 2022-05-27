import React, { useState } from "react";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState("");

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
    setData("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setUserName("");
    await fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
      .then((response) => {
        return response.json();
      })
      .then((allData) => {
        findLanguages(allData);
        favoriteLanguage(allLanguages);
      });
  };

  let allLanguages = [];

  const findLanguages = (allData) => {
    allData.filter((item) => {
      if (item.language !== null) {
        allLanguages.push(item.language);
      }
    });
    setUserName("");
  };

  const favoriteLanguage = (allLanguages) => {
    const uniqueLanguages = allLanguages.reduce((acc, val) => {
      acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
      return acc;
    }, {});
    const favoriteLanguage = Object.keys(uniqueLanguages).reduce((a, b) =>
      uniqueLanguages[a] > uniqueLanguages[b] ? a : b
    );
    setData(favoriteLanguage);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center m-4">
          GitHub user's favourite programming language!
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
                className="btn btn-outline-secondary border-left-0 rounded-0 rounded-right"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onChange={resetInputField}
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
              <div className="modal-body text-center">
                {data !== "" ? (
                  data
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

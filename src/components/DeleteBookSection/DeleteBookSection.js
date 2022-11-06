import React, { useState, useRef, useEffect } from "react";

import classes from "./DeleteBookSection.module.css";

const DeleteBookSection = () => {
  const [bookDeleted, setBookDeleted] = useState(false);
  const titleRef = useRef();

  const turnOffBookDeletedHandler = () => {
    setBookDeleted(false);
  };

  const deleteBookHandler = (e) => {
    e.preventDefault();

    const titleParam = titleRef.current.value.replace(" ", "-").toLowerCase();

    fetch(
      `https://book-ratings-172v.herokuapp.com/books/v1/get-by-title/${titleParam}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBookDeleted(true);
      });
  };

  return (
    <React.Fragment>
      {!bookDeleted && (
        <form className={classes["form-wrapper"]} onSubmit={deleteBookHandler}>
          <div className={classes["u-row"]}>
            <label htmlFor="title" className={classes["label-title"]}>
              Delete book by title:
            </label>
            <input
              type="text"
              name="title"
              ref={titleRef}
              className={classes["input-title"]}
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className={classes["btn-submit"]}
          />
        </form>
      )}

      {bookDeleted && (
        <React.Fragment>
          <p className={classes["error-message"]}>Book deleted</p>
          <button onClick={turnOffBookDeletedHandler}>
            Back to delete book
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DeleteBookSection;

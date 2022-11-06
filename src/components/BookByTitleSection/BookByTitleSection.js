import React, { useState, useRef, useEffect } from "react";

import classes from "./BookByTitleSection.module.css";

import BookCard from "../BookCard/BookCard";

const BookByTitleSection = () => {
  const [searchActivate, setSearchActivate] = useState(false);
  const [bookData, setBookData] = useState([]);

  let searchRef = useRef();
  let paramTitle = "";

  const searchHandler = (e) => {
    e.preventDefault();

    paramTitle = searchRef.current.value.replace(" ", "-").toLowerCase();

    setSearchActivate(!searchActivate);
    // searchRef.current.value = "";
  };

  useEffect(() => {
    paramTitle = searchRef.current.value.replace(" ", "-").toLowerCase();
    fetch(
      `https://book-ratings-172v.herokuapp.com/books/v1/get-by-title/${paramTitle}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.status === "success" && setBookData(data);
      });
  }, [searchActivate]);

  return (
    <React.Fragment>
      <form className={classes["form-wrapper"]} onSubmit={searchHandler}>
        <div className={classes["u-row"]}>
          <label htmlFor="title" className={classes["label-title"]}>
            Search by book title:
          </label>
          <input
            ref={searchRef}
            type="text"
            name="title"
            className={classes["input-title"]}
          />
        </div>
        <input type="submit" value="Search" className={classes["btn-submit"]} />
      </form>

      {bookData.status === "success" && bookData.data.length > 0 && (
        <BookCard
          title={bookData.data[0].title}
          author={bookData.data[0].author}
          rating={bookData.data[0].rating}
          added={bookData.data[0].added}
          comments={bookData.data[0].comments}
          key={bookData.data[0]._id}
        ></BookCard>
      )}

      {bookData.status === "success" && bookData.data.length === 0 && (
        <p className={classes["error-message"]}>
          No book found matching that title!
        </p>
      )}

      {bookData.status === "fail" && (
        <p className={classes["error-message"]}>
          Could not connect to database!
        </p>
      )}
    </React.Fragment>
  );
};

export default BookByTitleSection;

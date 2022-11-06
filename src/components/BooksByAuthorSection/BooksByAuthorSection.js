import React, { useState, useRef, useEffect } from "react";

import classes from "./BooksByAuthorSection.module.css";

import BookCard from "../BookCard/BookCard";

const BooksByAuthorSection = () => {
  const [searchActivate, setSearchActivate] = useState(false);
  const [booksData, setBooksData] = useState([]);

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
      `https://book-ratings-172v.herokuapp.com/books/v1/get-by-author/${paramTitle}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.status === "success" && setBooksData(data);
      });
  }, [searchActivate]);

  return (
    <React.Fragment>
      <form className={classes["form-wrapper"]} onSubmit={searchHandler}>
        <div className={classes["u-row"]}>
          <label htmlFor="title" className={classes["label-title"]}>
            Search by book author:
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

      {booksData.status === "success" && booksData.data.length > 0 && (
        <div className={classes["cards-wrapper"]}>
          {booksData.data.map((el) => (
            <BookCard
              title={el.title}
              author={el.author}
              rating={el.rating}
              added={el.added}
              comments={el.comments}
              key={el._id}
            ></BookCard>
          ))}
        </div>
      )}

      {booksData.status === "success" && booksData.data.length === 0 && (
        <p className={classes["error-message"]}>
          No book found matching that author!
        </p>
      )}

      {booksData.status === "fail" && (
        <p className={classes["error-message"]}>
          Could not connect to database!
        </p>
      )}
    </React.Fragment>
  );
};

export default BooksByAuthorSection;

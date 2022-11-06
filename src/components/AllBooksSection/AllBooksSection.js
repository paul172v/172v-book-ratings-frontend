import React, { useState, useEffect } from "react";

import classes from "./AllBooksSection.module.css";

import BookCard from "../BookCard/BookCard";

const AllBooksSection = () => {
  const [dataSuccess, setDataSuccess] = useState(false);

  const [booksData, setBooksData] = useState([]);

  const bookDataHandler = (data) => {
    setBooksData(data);
  };

  useEffect(() => {
    fetch("https://book-ratings-172v.herokuapp.com/books/v1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.status === "success" && setDataSuccess(true);
        bookDataHandler(data.data);
        data.status === "fail" && bookDataHandler([]);
        console.log(booksData);
      });
  }, []);

  return (
    <React.Fragment>
      <div className={classes["results-wrapper"]}>
        {dataSuccess &&
          booksData.length > 0 &&
          booksData.map((el) => (
            <BookCard
              title={el.title}
              author={el.author}
              rating={el.rating}
              added={el.added}
              comments={el.comments}
              key={el._id}
            ></BookCard>
          ))}

        {dataSuccess && booksData.length === 0 && (
          <p className={classes["error-message"]}>No books found!</p>
        )}

        {!dataSuccess && (
          <p className={classes["error-message"]}>
            Could not connect to database!
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default AllBooksSection;

import React, { useState, useRef, useEffect } from "react";

import classes from "./NewBookSection.module.css";

const NewBookSection = () => {
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [postStatus, setPostStatus] = useState("");
  const [postStatusMessage, setPostStatusMessage] = useState("");

  let titleRef = useRef();
  let authorRef = useRef();
  let ratingRef = useRef();
  let commentsRef = useRef();

  useEffect(() => {
    setDataSubmitted(false);
  }, []);

  const turnOffDataSubmittedHandler = () => {
    setDataSubmitted(false);
  };

  const postHandler = (e) => {
    e.preventDefault();

    fetch("https://book-ratings-172v.herokuapp.com/books/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleRef.current.value,
        author: authorRef.current.value,
        rating: ratingRef.current.value,
        comments: commentsRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setPostStatus("success");

        if (data.status === "success") {
          setPostStatusMessage("New book added");
        } else if (data.status === "fail") {
          setPostStatusMessage(data.message);
        }
        console.log(postStatusMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
        setPostStatus("fail");
      });

    setDataSubmitted(true);

    // paramTitle = searchRef.current.value.replace(" ", "-").toLowerCase();
  };

  return (
    <React.Fragment>
      {!dataSubmitted && (
        <form className={classes["form-wrapper"]} onSubmit={postHandler}>
          <label htmlFor="title" className={classes["label-title"]}>
            Book title:
          </label>
          <input
            ref={titleRef}
            type="text"
            name="title"
            className={classes["input-title"]}
          />

          <label htmlFor="author" className={classes["label-author"]}>
            Book author:
          </label>
          <input
            ref={authorRef}
            type="text"
            name="author"
            className={classes["input-author"]}
          />

          <label htmlFor="rating" className={classes["label-rating"]}>
            Book rating:
          </label>
          <input
            ref={ratingRef}
            type="text"
            name="rating"
            className={classes["input-rating"]}
          />

          <label htmlFor="comments" className={classes["label-comments"]}>
            Book comments:
          </label>
          <textarea
            rows="4"
            cols="50"
            ref={commentsRef}
            name="comments"
            className={classes["input-comments"]}
          />

          <input
            type="submit"
            value="Submit"
            className={classes["btn-submit"]}
          />
        </form>
      )}

      {dataSubmitted && (
        <React.Fragment>
          <div className={classes["message-wrapper"]}>
            {postStatus === "success" && (
              <p className={classes["message-text"]}>{postStatusMessage}</p>
            )}
            {postStatus === "fail" && (
              <p className={classes["message-text"]}>There was an error</p>
            )}
          </div>
          <button
            className={classes["btn-posted"]}
            onClick={turnOffDataSubmittedHandler}
          >
            Return to New Book
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewBookSection;

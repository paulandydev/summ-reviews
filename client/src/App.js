import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  box: {
    width: 300,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f6f8fc",
    marginBottom: 16,
  },
  textarea: {
    width: "100%",
    borderRadius: 10,
  },
}));

const App = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([
    { comments: [], language: "English" },
    { comments: [], language: "French" },
  ]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchComments = async () => {
    setIsFetching(true);
    try {
      const formData = new FormData();
      formData.append("text", text);

      const response = await axios.post(
        "https://comment-report-flask.herokuapp.com/embed_and_search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setComments(response.data || []);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
    setIsFetching(false);
  };

  const handleButtonClick = () => {
    if (isFetching) return;
    fetchComments();
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 64,
          boxShadow: "0px 1px 3px 0px #ccc",
          borderRadius: "10px",
          width: "320px",
          paddingTop: "10px",
        }}
      >
        <Box className={classes.box} style={{ backgroundColor: '#150043', color: '#fff' }}>
          <Typography variant="h5" align="center">
            ReviewHub
          </Typography>
        </Box>
        <Box className={classes.box}>
          <TextareaAutosize
            placeholder="Insert text"
            minRows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={classes.textarea}
          />
        </Box>
        <Box className={classes.box} style={{ minHeight: "300px" }}>
          {comments.map((commentGroup, index) => (
            <Box key={index}>
              <Typography variant="subtitle2">
                Language: {commentGroup.language}
              </Typography>
              {commentGroup.comments.length ? (
                commentGroup.comments.map((comment, idx) => (
                  <Typography key={idx} paragraph>
                    Comment: {comment}
                  </Typography>
                ))
              ) : (
                <Typography paragraph>Comment:</Typography>
              )}
            </Box>
          ))}
        </Box>
        <Box className={classes.box}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleButtonClick}
            disabled={isFetching}
            style={{ backgroundColor: "#652dfe", color: "#fff" }}
          >
            {isFetching ? "In process..." : "Start"}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default App;

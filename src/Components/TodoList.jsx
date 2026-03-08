import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import "../css_module/style.css";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../css_module/style.css";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "../contxt/todosContext";
import { useContext, useState, useEffect } from "react";

// const initialTodos  = [
//   {
//     id: uuidv4(),
//     title: "read..",
//     details: "in progress..",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "read..",
//     details: "in progress..",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "read..",
//     details: "in progress..",
//     isCompleted: false,
//   },
// ];

export default function TodoList() {
  // const[todos,setTodos]= useState(initialTodos)
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, SetDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRender = notCompletedTodos;
  } else {
    todosToBeRender = todos;
  }

  const todosJsx = todosToBeRender.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        handlCheck={handleCheckClick}
        // title={t.title}
        // details={t.details}
        // isCompleted={t.isCompleted}
      />
    );
  });

  useEffect(() => {
    console.log("calling useEffect");
    const storageTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodo);
  }, []);

  function changeDisplayedType(e) {
    SetDisplayedTodosType(e.target.value);
  }

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  function handleCheckClick(todoId) {}

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#11022e",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{ minWidth: 600, background: "", borderRadius: "20px" }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              style={{
                color: "#0d47a1",
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "a",
              }}
              variant="h2"
            >
              <i>My-Tasks</i>
            </Typography>
            <Divider />
          </CardContent>
          <ToggleButtonGroup
            className="button"
            style={{
              // color: "white",
              display: "flex",
              justifyContent: "center",
              gap: "0",
              marginTop: "20px",
            }}
            value={displayedTodosType}
            exclusive={true}
            onChange={changeDisplayedType}
          >
            <ToggleButton
              style={{
                border: "1px solid",
                borderRadius: "10px",
                fontSize: "10px",
                padding: "4px 20px",
                width: "fit-content",
                margin: "0",
                background: "blue",
                fontSize: "15px",
                color: "white",
                fontFamily: "a",
              }}
              value="all"
            >
              All
            </ToggleButton>

            <ToggleButton
              style={{
                border: "1px solid",
                borderRadius: "10px",
                fontSize: "10px",
                padding: "4px 20px",
                width: "fit-content",
                margin: "0 ",
                background: "#8bc34a",
                fontSize: "15px",
                color: "white",
                fontFamily: "a",
              }}
              value="completed"
            >
              CPD
            </ToggleButton>
            <ToggleButton
              style={{
                border: "1px solid",
                borderRadius: "10px",
                fontSize: "10px",
                padding: "4px 20px",
                width: "fit-content",
                margin: "0",
                background: "yellow",
                fontSize: "15px",
                color: "white",
                fontFamily: "a",
              }}
              value="non-completed"
            >
              In P
            </ToggleButton>
          </ToggleButtonGroup>

          {todosJsx}

          {/* ====== INPUT + ADD BUTTON ======== */}
          <Grid
            sx={{
              // background: "orange",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "15px",
              margin: "30px",
              // padding: "5px",
            }}
            container={2}
          >
            <Grid
              style={{
                color: "black",
                borderRadius: "15px",
                fontFamily: "a",
              }}
              size={8}
            >
              <TextField
                style={{ width: "95%", borderRadius: "15px", fontFamily: "a" }}
                id="outlined-basic"
                label="Add Tasks..."
                variant="outlined"
                value={titleInput}
                onChange={(event) => {
                  setTitleInput(event.target.value);
                }}
              />
            </Grid>
            <Grid sx={{}} size={4}>
              <Button
                className="button"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "15px",
                  borderRadius: "15px",
                }}
                variant="contained"
                onClick={(event) => {
                  handelAddClick();
                }}
                disabled={titleInput.length === 0}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
          {/* ====== INPUT + ADD BUTTON ======== */}
        </Card>
      </Container>
    </>
  );
}

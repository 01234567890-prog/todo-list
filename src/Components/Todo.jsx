import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../css_module/style.css";
import { useContext, useState } from "react";
import { TodosContext } from "../contxt/todosContext";

// dialog_import :

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Todo({ todo, handlCheck, showDelete , showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);

  
  const [upDatedTodo, setUpDatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // EVENT HANDLERS
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        // if(t.isCompleted){
        //   t.isCompleted = false;
        // }else{
        //   t.isCompleted = true;
        // }
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick(todo) {
    showUpdate(todo)
    
  }
  

  // ==EVENT HANDLERS
  return (
    <>
      

      <Card
        className="card"
        sx={{
          minWidth: 275,
          background: "#1a237e",
          color: "white",
          borderRadius: "15px",
          margin: "30px",
          padding: "5px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={8}
              style={{
                // background: "red",
                borderRadius: "10px",
              }}
            >
              <Typography
                style={{
                  textAlign: "left",
                  color: "red",
                  fontFamily: "a",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                variant="h5"
              >
                <i>{todo.title}</i>
              </Typography>

              <Divider style={{ marginTop: "15px" }} />
              <Typography
                style={{
                  textAlign: "left",
                  marginTop: "15px",
                  fontFamily: "a",
                }}
                variant="h5"
              >
                <i>{todo.details}</i>
              </Typography>
            </Grid>

            <Grid
              size={4}
              style={
                {
                  // background: "green",
                  // display: "grid",
                  // alignItems: "center",
                  // borderRadius: "10px",
                  // padding: "0",
                }
              }
            >
              <main
                className="button"
                style={{
                  display: "flex",
                  gap: "0",
                  width: "fit-content",
                  maxWidth: "100px",
                  marginRight: "50px",
                  marginTop: "60px",
                }}
              >
                {/* chekButton */}
                <IconButton
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.4em 0.8em",
                    margin: "2px",
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    background: todo.isCompleted ? "#8bc34a" : "white",
                    border: "solid #8bc34a 3px",
                  }}
                  onClick={() => {
                    handleCheckClick();
                  }}
                >
                  <CheckIcon />
                </IconButton>
                {/* ==chekButton== */}

                {/* ===UPDATEBUTTON== */}

                <IconButton
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.4em 0.8em",
                    margin: "2px",
                    color: "#3169e2",
                    background: "white",
                    border: "solid #3169e2 3px",
                  }}
                  onClick={handleUpdateClick}
                >
                  <CachedIcon />
                </IconButton>

                {/* ===UPDATEBUTTON== */}

                {/* delete_Button */}
                <IconButton
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.4em 0.8em",
                    margin: "2px",
                    color: "#d61b1b",
                    background: "white",
                    border: "solid #d61b1b 3px",
                  }}
                  onClick={handleDeleteClick}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                {/* ==Delete_Button== */}
              </main>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions></CardActions>
      </Card>
    </>
  );
}
export default Todo;

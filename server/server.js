const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.get("/tasks/:userEmail", async (req, res) => {
  const { userEmail } = req.params

  try {
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_email = $1", [userEmail])
    res.json(tasks.rows)
  } catch (err) {
    console.error(err.message)
  }
});

app.post("/tasks" , async(req,res) => {
  const { user_email, title, urgency, date } = req.body

  try {
      const id = uuidv4();
      const newTask = await pool.query(
        "INSERT INTO tasks (id, user_email, title, urgency, date) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [id, user_email, title, urgency, date]
      );
      res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_email, title, urgency, date } = req.body;
    const updateTask = await pool.query(
      "UPDATE tasks SET user_email = $1, title = $2, urgency = $3, date = $4 WHERE id = $5",
      [user_email, title, urgency, date, id]
    );
    res.json("Task was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/tasks/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await pool.query("DELETE from tasks WHERE id = $1", [
      id,
    ]);
    res.json("Task was deleted!")
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

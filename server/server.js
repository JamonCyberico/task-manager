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

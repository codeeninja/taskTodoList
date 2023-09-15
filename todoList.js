// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

  
// Registration
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(insertUserQuery, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating user' });
    } else {
      res.status(201).json({ message: 'User created successfully' });
    }
  });
});

// Login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const selectUserQuery = 'SELECT * FROM users WHERE username = ?';

  db.query(selectUserQuery, [username], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching user' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: 'Authentication failed' });
      } else {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Authentication failed' });
        }
      }
    }
  });
});


// Create Task by userId
app.post('/create/task/:userId',function(req,resp){
    const userId=req.params.userId;
    const {description,status,dueDate}=req.body;
    const sql='insert into tasks(description,status,dueDate,userId) values (?,?,?,?) ';
    db.query(sql,[description,status,dueDate,userId],function(err,result){
        if(err){
            resp.send(err)
        }
        else{
            resp.send("Task created Successfully")
        }
    })
})
//Get Task by userId
app.get('/get/task/:userId',function(req,resp){
    const userId=req.params.userId;
    const sql="select *from tasks where userId=?";
    db.query(sql,[userId],function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    });
});

// Update Task by userId
app.put('/update/tasks/:id', (req, resp) => {
   const taskId=req.params.id;
   const {description,status,dueDate}=req.body;
   const sql="update tasks set description=?,status=?,dueDate=? where id=?";
   db.query(sql,[description,status,dueDate,taskId],function(err,result){
    if(err){
        resp.send(err);
    }
    else{
        resp.send("Task Updated successfully")
    }
   })
  });
  
// Delete Task userId
app.delete('/delete/tasks/:id', (req, resp) => {
    const taskId=req.params.id;
    const sql="delete from tasks where id=?";
    db.query(sql,[taskId],function(err,result){
        if(err){
            console.log(err);
        }
        else{
            resp.send("Task has been deleted successfully");
        }
    })
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

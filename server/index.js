const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeesSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, row) => {
    if (err) {
      console.log(err);
    } else if (row) {
      res.send(row);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, row) => {
      if (err) {
        console.log(err);
      } else if (row) {
        res.send(row);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET wage = ? WHERE id = ? ",
    [wage, id],
    (err, row) => {
      if (err) {
        console.log(err);
      } else if (row) {
        res.send(row);
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", id, (err, row) => {
    if (err) {
        console.log(err);
    }else if (row) {
        res.send(row);
    }
  });
});

app.listen("3001", () => {
  console.log("Server is running on port 3001...");
});

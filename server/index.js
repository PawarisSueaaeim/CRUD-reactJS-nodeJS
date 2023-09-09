const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employeesSystem'
})

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, row) => {
        if (err) {
            console.log(err)
        }else if (row) {
            res.send(row)
        }
    })
})

app.listen('3001', () => {
    console.log("Server is running on port 3001...")
})
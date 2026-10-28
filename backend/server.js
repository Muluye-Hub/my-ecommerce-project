const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'ecommerce_db',
    port: 3306         
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('MySQL Database connected successfully! 🎉');
    }
});

app.get('/', (req, res) => {
    res.send('E-commerce Backend Server is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
// Get all products from database
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'nanthiesh277',
    database: 'virtual_marketplace'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Fetch all products
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Fetch a single product by ID
app.get('/products/:id', (req, res) => {
    let sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Create Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { productId } = req.body;
    
    let sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], async (err, result) => {
        if (err) throw err;
        const product = result[0];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    unit_amount: product.price * 100, // Stripe expects the amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://your-website.com/success',
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ id: session.id });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));

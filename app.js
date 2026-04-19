const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const policyRoutes = require('./routes/policyRoutes');
const quoteRoutes  = require('./routes/quoteRoutes');

app.use('/policies', policyRoutes);
app.use('/quotes',   quoteRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

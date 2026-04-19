const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb+srv://manthan:12345Man@cluster1.llvdj2d.mongodb.net/insuranceDB?appName=Cluster1';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected to insuranceDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

const policySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    plan: { type: String, required: true },
  },
  { collection: 'policies', timestamps: true }
);

const Policy = mongoose.model('Policy', policySchema);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.render('home', { policies });
  } catch (err) {
    res.status(500).send('Error fetching policies: ' + err.message);
  }
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  try {
    const { name, email, phone, age, city, plan } = req.body;
    await Policy.create({ name, email, phone, age, city, plan });
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error adding policy: ' + err.message);
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).send('Policy not found');
    res.render('edit', { policy });
  } catch (err) {
    res.status(500).send('Error loading policy: ' + err.message);
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    const { name, email, phone, age, city, plan } = req.body;
    await Policy.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phone,
      age,
      city,
      plan,
    });
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error updating policy: ' + err.message);
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting policy: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Health Insurance Portal running at http://localhost:${PORT}`);
});

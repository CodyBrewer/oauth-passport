const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 4000;

// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

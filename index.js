const express = require('express');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.render("home");
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})
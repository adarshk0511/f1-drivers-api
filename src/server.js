const express = require('express');
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the F1 Drivers API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
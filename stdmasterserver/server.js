const express = require('express');
const cors = require('cors');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

const studentRouter = require('./routes/studentData');
app.use('/api/student', studentRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

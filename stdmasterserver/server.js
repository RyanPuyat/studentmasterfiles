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

// app.get('/', (req, res) => {
//   res.send({ message: 'Hello to student API' });
// });

// app.get('/api/students', (req, res) => {
//   res.send({ success: true, data: students });
// });

const studentRouter = require('./routes/studentData');
app.use('/api/student', studentRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import './db/index.js';
//import authenticate from './authenticate';


import usersRouter from './api/users';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);


app.use(errHandler);  

app.listen(process.env.PORT, () => {
  console.info(`Server running at ${process.env.PORT}`);
});
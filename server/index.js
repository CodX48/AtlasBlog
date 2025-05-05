import express from 'express';
import UsersRouter from './src/router/UserRouter.js'; 
import BlogRouter from './src/router/PostRouter.js';
import mongoose from 'mongoose';
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Blog")
  .then(async () => {
    console.log("Database is connected");

  }).catch(e => console.log("Database failed to connect", e));


app.use('/users', UsersRouter);
app.use('/blogs', BlogRouter);

// app.get('/', (req, res) => {
//   res.send('Welcome to the home page!');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

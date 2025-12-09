import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import * as userController from './controllers/users';
import bodyparser from 'body-parser';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.post('/api/auth/register', userController.register);
app.get('/', (req, res) => {
    res.send('Hello World');
});
mongoose.connect('mongodb://localhost:27017/chat')
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

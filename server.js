const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: '.env' });

const app = require('./app');

const DB = process.env.MONGO_URI;

mongoose.connect(DB).then(() => {
  console.log('DB connected successfully 🔥🎉');
});

//define port
const port = process.env.PORT;
//for start the server of express
const server = app.listen(port, () => {
  console.log(`the server start on port ${port} 🤡`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

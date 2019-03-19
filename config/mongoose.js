const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongodbroot:rootmongodb@cluster0-csqcz.azure.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('\n\x1b[31mConnection error:\x1b[0m');
  console.log(err);
});

db.on('open', () => {
  console.log(`\n\x1b[32mSuccessfully connected to ${db.host}\x1b[0m\n`);
});

module.exports = mongoose;
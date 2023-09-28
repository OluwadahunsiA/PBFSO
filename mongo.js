const mongoose = require('mongoose');

// if (process.argv.length < 4) {
//   console.log('please ensure that you have added all the necessary variables');
//   process.exit(1);
// }

const password = process.argv[2];

if (!password) {
  console.log('please enter your password');

  process.exit(1);
}

const uri = `mongodb+srv://Oluwadahunsi:${password}@cluster0.jew1r.mongodb.net/phonebookApp`;

mongoose.set('strictQuery', false);

console.log(uri);
mongoose.connect(uri);

// build the schema. A schema is a basically a guide as to what each added object
// should contain. It tells the programmer the expected values that will be present
// in the object that will be added.

const phonebookSchema = new mongoose.Schema({
  name: String,
  telephone: String,
});

const Phone = mongoose.model('phone', phonebookSchema);

const phone = new Phone({
  name: process.argv[3],
  telephone: process.argv[4],
});

// phone.save().then((result) => {
//   console.log(
//     `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
//   );

//   mongoose.connection.close();
// });

if (process.argv.length == 3) {
  Phone.find({}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}

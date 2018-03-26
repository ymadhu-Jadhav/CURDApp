'use strict';

const db = require('./server/db');
const User = db.models.user
const Student = db.models.student


const users = [{
  firstName: 'Jasmine',
  lastName: 'J',
  email: 'jasmine@j.com',
}, {
  firstName: 'Joleene',
  lastName: 'M',
  email: 'joleene@m.com',
}, {
  firstName: 'Jennifer',
  lastName: 'K',
  email: 'jennifer@k.com',
  isAdmin: true,
  password: '123'
}]

const students = [{
    firstName: 'Clary',
    lastName: 'A',
    email: 'clary@a.com',
  }, {
    firstName: 'Claudia',
    lastName: 'B',
    email: 'claudia@b.com',
  }, {
    firstName: 'Cevin',
    lastName: 'C',
    email: 'cevin@c.com',
  }]



const seed = () =>
  Promise.all(users.map(user => User.create(user)))
  .then(() =>
    Promise.all(students.map(student => Student.create(student)))
    )
  

const main = () => {
  console.log('Syncing the db');
  db.sync({ force: true })
  .then(() => {
    console.log('Seeding the db');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err);
  })
  .then(() => {
    db.close();
    return null;
  });
};
main();
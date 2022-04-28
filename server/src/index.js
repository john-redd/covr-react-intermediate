const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const { SERVER_PORT, SESSION_SECRET } = process.env;

const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const users = [];
let currentIndex = users.length + 1;

app.get('/auth/user', (req, res) => {
  const id = req.session?.user?.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.sendStatus(401);
  }

  res.status(200).send(user);
});

app.post('/auth/login', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: currentIndex });

  console.log(req.session);

  req.session.user = { id: currentIndex };
  currentIndex++;

  res.sendStatus(200);
});
app.post('/auth/logout', (req, res) => {
  const id = req.session.user.id;
  const userIndex = users.findIndex((u) => u.id === id);

  users.splice(userIndex, 1);

  res.sendStatus(200);
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);

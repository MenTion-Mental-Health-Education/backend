const express = require('express');
const app = express();
const db = require('./models');
const { Users } = require('./models')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {createTokens, validateToken} = require('./JWT');

app.use(express.json());
app.use(cookieParser());

app.post('/register', (req, res) => {
    const {username, password, fullname, phonenumber} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            fullname: fullname,
            phonenumber: phonenumber,
        })
        .then(() =>{
            res.json('USER REGISTERED');
        })
        .catch((err) => {
            if (err) {
                res.status(400).json({error: err});
            }
        });
    });
  });

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({ where: {username: username} });
    if (!user) res.status(400).json({ error: 'User Doesn\'t Exist'});

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if(!match) {
            res.status(400)
            .json({error: 'Wrong Usename and Password Combination'});
        } else {
            const accessToken = createTokens(user);
            
            res.cookie('access-token', accessToken, {
                maxAge: 2592000000,
                httpOnly: true,
            });
            res.json('LOGGED IN');
        }
    });
  });


app.get("/logout", validateToken, (req, res) => {
    res.clearCookie('access-token');
    res.end();
});

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server Running on Port 3000");
      });
});

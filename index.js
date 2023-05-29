const express = require('express');
const app = express();
const db = require('./models');
const { Users, Posts, Comments, } = require('./models')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {createTokens, validateToken} = require('./JWT');

app.use(express.json());
app.use(cookieParser());

  // route for register
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

  //route for login
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
            
            res.json({ accessToken: accessToken});
        }
    });
  });

  // route for post in forum
app.post('/forum/posts', validateToken, (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
  
    Posts.create({
      title: title,
      content: content,
      userId: userId,
    })
      .then(() => {
        res.json('Post created successfully');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
      });
  });  

  // route for get all posts in forum
app.get('/forum/posts', validateToken, (req, res) => {
    Posts.findAll()
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
      });
  });

// route for comment in post
app.post('/forum/posts/:postId/comments', validateToken, (req, res) => {
  const { comment } = req.body;
  const userId = req.user.userId;
  const postId = req.params.postId;

  Comments.create({
    comment: comment,
    userId: userId,
    postId: postId,
  })
    .then(() => {
      res.json('Comment created succesfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create comment' });
    });
});

  // route for get all comments in posts
app.get('/forum/posts/:postId/comments', validateToken, (req, res) => {
  const postId = req.params.postId;

  Comments.findAll({ where: { postId: postId } })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch comments' });
    });
});

  //route for logout
app.get("/logout", validateToken, (req, res) => {
    delete req.headers.authorization;
    res.end();
});

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server Running on Port 3000");
      });
});

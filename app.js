const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://timx0645:' + env.process.PSW + '@cluster0-081uj.azure.mongodb.net/mandatory?retryWrites=true');
const Question = require('./models/question');
const Comment = require('./models/comment');
const Profil = require('./models/profil');
app.use(bodyParser.json());

/****** Configuration *****/
const port = (process.env.PORT || 8090);

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

/****** Routes *****/
//Fanger alle spørgsmål
app.get(`/question`, (req, res) => {
    Question.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => console.log(err));
});

//fanger spørgsmål udfra id
app.get(`/question/:id/${process.env.API_KEY}`, (req, res) => {
    const { id } = req.params;
    Question.findById(id)
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
            res.status(200).json(result);
        }
    })
    .catch(err => console.log(err));
});

//fanger spørgsmål udfra id
app.get(`/question/profil/:id/${process.env.API_KEY}`, (req, res) => {
    const { id } = req.params;
    Question.find({pid:id})
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
            res.status(200).json(result);
        }
    })
    .catch(err => console.log(err));
});

//Fanger alle profiler
app.get(`/profil/${process.env.API_KEY}`, (req, res) => {
    Profil.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => console.log(err));
});

//fanger profil udfra id
app.get(`/profil/:id/${process.env.API_KEY}`, (req, res) => {
    const { id } = req.params;
    Profil.findById(id)
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
            res.status(200).json(result);
        }
    })
    .catch(err => console.log(err));
});

//fanger udfra udfra spørgsmålsid
app.get(`/comment/:id/${process.env.API_KEY}`, (req, res) => {
    const { id } = req.params;
    Comment.find({qid:id})
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
            res.status(200).json(result);
        }
    })
    .catch(err => console.log(err));
});

//laver en kommentar her
app.post(`/comment/${process.env.API_KEY}`, (req, res) => {
    if(!req.body.qid) {
        return res.status(401).send({
          success: 'false comment'
    })
    } else if(!req.body.pid) {
        return res.status(402).send({
          success: 'false comment'
    });
    } else if(!req.body.comment) {
        return res.status(403).send({
          success: 'false comment',
    });
  } else if(!req.body.name) {
        return res.status(404).send({
          success: 'false comment',
    });
    }
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        qid: req.body.qid,
        pid: req.body.pid,
        name: req.body.name,
        comment: req.body.comment,
        vote: 0,
      });
      comment.save()
    .then(result => console.log(result))
    .catch(err =>
        res.status(500).send({
            success: 'false',
            message: err
            })
        );
    return res.status(201).send({
    success: 'true',
    message: 'Comment added successfully', comment
    });
});

//laver en kommentar her
app.post(`/question/${process.env.API_KEY}`, (req, res) => {
    if(!req.body.question) {
        return res.status(401).send({
          success: 'false question'
    })
    } else if(!req.body.pid) {
        return res.status(402).send({
          success: 'false pid'
    })
    } else if(!req.body.title) {
        return res.status(403).send({
          success: 'false title'
    })
    } else if(!req.body.name) {
        return res.status(404).send({
          success: 'false name'
    })
    }
    const question = new Question({
        _id: new mongoose.Types.ObjectId(),
        pid: req.body.pid,
        title: req.body.title,
        name: req.body.name,
        question: req.body.question
      });
      question.save()
    .then(result => console.log(result))
    .catch(err =>
        res.status(500).send({
            success: 'false',
            message: err
            })
        );
    return res.status(201).send({
    success: 'true',
    message: 'Question added successfully', question
    });
});

//laver en kommentar her
app.post(`/profil/${process.env.API_KEY}`, (req, res) => {
    if(!req.body.email) {
        return res.status(401).send({
          success: 'false email'
    })
    } else if(!req.body.psw) {
        return res.status(402).send({
          success: 'false psw'
    })
    } else if(!req.body.name) {
        return res.status(403).send({
          success: 'false name'
    })
    }
    const profil = new Profil({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        psw: req.body.psw,
        name: req.body.name
      });
      profil.save()
    .then(result => console.log(result))
    .catch(err =>
        res.status(500).send({
            success: 'false',
            message: err
            })
        );
    return res.status(201).send({
    success: 'true',
    message: 'Profil added successfully', profil
    });
});

//Sletter en opskrift
app.delete(`/question/${process.env.API_KEY}`, (req, res) => {
    Question.remove({_id : req.body.id})
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
        }
    })
    .catch(err => console.log(err));
});

//Sletter en kommentar
app.delete(`/comment/${process.env.API_KEY}`, (req, res) => {
    Comment.remove({qid : req.body.id})
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
        }
    })
    .catch(err => console.log(err));
});

//Opdatere vote for en comment
app.put(`/vote/:id/${process.env.API_KEY}`, (req, res) => {
    const { id } = req.params;
    Comment.update({_id : id}, { $set: {
        vote: req.body.vote
    }})
    .exec()
    .then(result => {
        if(!result) {
            res.sendStatus(404).send({
                success: 'false',
                message: 'Id findes ikke',
          });
        } else {
            res.status(200).json(result);
        }
    })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Cooking API running on port ${port}!`));

var express     = require('express');
var bodyParser  = require('body-parser');

var {mongoose}  = require('./db/mongoose.js');
var {Todo}      = require('./models/todo.js');
var {User}      = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
     Todo.find().then((todos) => {
        res.send({
            todos
        });
     }, (e) => {
         res.status(400).send(e);
     });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

//var newTodo = new Todo({
//    text: 'Cook dinner'
//});

//newTodo.save().then((doc) => {
//    console.log('Saved todo', doc);
//}, (e) => {
//    console.log('Unable save todo', e);
//});
//
//var otherTodo = new Todo({
//    text: 'Cook lunch',
//    completed: true,
//    completedAt: 123
//});
//
//otherTodo.save().then((doc) => {
//    console.log('Saved todo', doc);
//}, (e) => {
//    console.log('Unable save todo', e);
//});

//var newUser = new User({
//    email: 'egykettoharo@gmail.com'
//});
//
//newUser.save().then((doc) => {
//    console.log('Saved user', doc);
//}, (e) => {
//    console.log('Unable save user', e);
//});

module.exports = {app};
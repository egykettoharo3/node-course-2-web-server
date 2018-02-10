const {ObjectID} = require('mongodb');
const jwt       = require('jsonwebtoken');

const {Todo}      = require('./../../models/todo.js');
const {User}      = require('./../../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'egykettoharo@gmail.com',
        password: 'password1',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access:'auth'}, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'egykettoharo2@gmail.com',
        password: 'password2'
    }
]

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo',
        completed: false
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    },
    {
        _id: new ObjectID(),
        text: 'Third test todo',
        completed: false
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => {
        done();
    });
};

module.exports = {todos, populateTodos, users, populateUsers};
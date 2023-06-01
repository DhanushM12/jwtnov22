const express = require('express');
const app = express()
const port = 8080;
const jwt = require('jsonwebtoken')

app.get('/', (req, res) => {
    res.json({message: 'Welcome to node'})
    // res.send('<h1>Welcome to node js!</h1>')
})

app.post('/tokenGenerate', (req, res) => {
    const user = {
        id: 1234,
        username: 'Nov22',
        email: 'Nov22@coding.com'
    }
    jwt.sign(user, 'secret', function(err, token) {
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                token
            })
        }
      });
})

// middleware
function extractToken(req, res, next){
    const bearerHeader = req.headers['authorization']; // Bearer token
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' '); // ['Bearer', 'token']
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    }
    else{
        res.sendStatus(403)
    }
}
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`)
        return;
    }
    console.log(`Server is up and running on port ${port}`)
})
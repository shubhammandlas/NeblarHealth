const express = require('express');
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const db = require('./models');
const { graphqlHTTP } = require("express-graphql")
const schema = require('./schemas/index')

dotenv.config();

//connecting to mongo
const connectDB = require("./dbConfig/repo");
const verifyToken = require('./service/auth');
connectDB();

app.use(express.json());


app.use('/graphql', verifyToken, graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Neblar Health app listening on port ${port}`);
});

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});

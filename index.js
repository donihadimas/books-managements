const express = require('express')
const swaggerUi = require("swagger-ui-express");
const swaggerjsDocs = require('./src/api/apiDocumentation');
const connectToDB = require('./src/database');
const mainRouter = require('./src/api/mainRouter');
const errorHandler = require('./src/middleware/error-handler');

const app = express()
const port = 3000

// ? connect to database
connectToDB();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// ? Define Main Router
app.use(mainRouter)

// ? serve Swagger
app.use("/api/v1", swaggerUi.serve, swaggerUi.setup(swaggerjsDocs.documentations))



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

app.use(errorHandler);

module.exports = app;
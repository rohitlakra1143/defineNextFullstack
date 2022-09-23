const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serverless = require('serverless-http')
const mdbClient = require('./config/mongoConfig');
const api=require('./routers/testinomialRoutes')


const env = process.env.NODE_ENV;

//const port = process.env.NODE_ENV == 'dev' ? 3000 : 3300;

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" ,
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept, loggedinuseruid"
  }));
  app.use(morgan(env))
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '200mb'}));
  app.use(bodyParser.urlencoded({ extended: true }));

  // Declare a route
// app.get('/', async (request, reply) => {
//     reply.send({ hello: `world ${env}` })
//   });

  //app.use('/api',api);
  app.use('/.netlify/functions/api',api)
  // Run the server!
const start = async () => {
    try {
      await mdbClient();
     // await app.listen(port)
      //console.info(`server ${env} listening on ${port}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
  start();
  module.exports = app;
  module.exports.handler = serverless(app)
  

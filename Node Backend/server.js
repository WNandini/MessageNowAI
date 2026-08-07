const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoute = require('./src/routes/user.route')
const authRoutes = require('./src/routes/auth.route');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("✅ db connected");
  console.log(`📦 Current Database: ${mongoose.connection.db.databaseName}`);
})
.catch(error => console.log("Db not conenct"))

app.use(express.json());

const swaggerSpec = require('./src/config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoute);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(5000, () => {
  console.log("Server is working")
})
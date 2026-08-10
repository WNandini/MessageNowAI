const express = require('express')
const app = express()

const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoute = require('./src/routes/user.route')
const authRoutes = require('./src/routes/auth.route');
const webhookRoute = require('./src/routes/webhook.route');
const automationRoute = require("./src/routes/automation.route");
const activityRoute = require('./src/routes/activity.route');

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("✅ db connected");
})
.catch(error => console.log("Db not conenct"))

app.use(express.json());

const swaggerSpec = require('./src/config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoute);
app.use('/auth', authRoutes);
app.use('/', webhookRoute);
app.use("/automation", automationRoute);
app.use("/activity", activityRoute);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(5000, () => {
  console.log("Server is working")
})
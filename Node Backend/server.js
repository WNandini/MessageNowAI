const express = require('express')
const app = express()

const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const userRoute = require('./src/routes/user.route')
const authRoutes = require('./src/routes/auth.route');
const webhookRoute = require('./src/routes/webhook.route');
const automationRoute = require("./src/routes/automation.route");
const activityRoute = require('./src/routes/activity.route');
const instagramRoutes = require("./src/routes/instagram.routes");
const uploadRoutes = require("./src/routes/upload.route");
const activityRoutes = require("./src/routes/activity.route");

require('dotenv').config()

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("✅ db connected");
})
.catch(error => console.log("Db not conenct"))

app.use(express.json());
app.use(cookieParser());

const swaggerSpec = require('./src/config/swagger');
const path = require("path");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoute);
app.use('/auth', authRoutes);
app.use('/', webhookRoute);
app.use("/automation", automationRoute);
app.use("/activity", activityRoute);
app.use("/instagram", instagramRoutes);
app.use("/upload", uploadRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(5000, () => {
  console.log("Server is working")
})
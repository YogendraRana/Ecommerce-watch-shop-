const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');  
const cloudinary = require('cloudinary').v2;

// import middleware
const errorMiddleware = require('./middleware/errorMiddleware.js');

// import configurations
const configSocket = require('./config/socket.js');

//import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoute = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

//express app
const app = express();

//configure dotenv file
//adding secret file in render.com and using following path to access/read it
dotenv.config({ path: '/etc/secrets/config.env' });

//variables
const PORT = process.env.PORT || 8000;
const DATABASE = process.env.DATABASE

//middleware
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL}));

//database and server connection
mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
.catch(err => console.log(err));

//cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// socket.io
configSocket();

//routes
app.get('/', (req, res) => res.send("Home"));
app.use(authRoutes);
app.use(productRoutes);
app.use(paymentRoute);
app.use(orderRoutes);
app.use(wishlistRoutes);
app.use(subscriberRoutes);
app.use(chatRoutes);
app.use(messageRoutes);


//error middleware
app.use(errorMiddleware);
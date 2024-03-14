import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// user routes
import userRoutes from './routes/user.routes.js'
app.use('/api/v1/users', userRoutes)

// contact routes
import contactRoutes from './routes/contact.routes.js'
app.use('/api/v1/contacts', contactRoutes)




export default app;
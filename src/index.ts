import 'reflect-metadata'
import express, {Request, Response} from 'express'
import cors from 'cors'
import { routes } from './routes/route';
import { dataSource } from './db/connector';
import cookieParser from 'cookie-parser';



const app = express();

// user cookie 
app.use(cookieParser())
// use json for API routes
app.use(express.json());
// cors for api address/port
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3001"]
}));



app.get('/', (req: Request, res: Response) => {
    res.send('INFO :: Root route called');
});

app.listen(process.env.PORT, () => {
    console.log(`INFO :: Webserver started on port ${process.env.PORT} ` )
});

routes(app)
dataSource
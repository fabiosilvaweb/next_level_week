import express from 'express';
import cors from 'cors';
import routes from './routes';
import { resolve } from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(resolve(__dirname, '..', 'uploads')))

app.use(errors());

app.listen(3333, () => console.log("✔ Server started!"))

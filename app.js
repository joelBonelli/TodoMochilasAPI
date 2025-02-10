import express from 'express';
import bodyParser from 'body-parser';
import apiProductos from "./routes/routes.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.urlencoded( { extended: true }))
//app.use( bodyParser.json() )
app.use(( req, res, next ) => {
    console.log("middleware ejecutado - body recibido:", req.body);
    next()
})
app.use(apiProductos);

app.listen(8888, () => {
    console.log("listo para usar");
})
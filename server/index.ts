import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { rootRouter } from "./src/routes/root.routes";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

rootRouter(app);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

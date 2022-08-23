import  express  from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from 'path'
import { fileURLToPath } from 'url'

import route from "./routes/route.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = 3030

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

// xử lí post
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('.html', engine({
    extname: ".html",
    encoding: "utf-8",
    partialsDir: {dir: path.join(__dirname, "resources/views/partials")},
    layoutsDir:  path.join(__dirname, "resources/views/layouts"),
}));
app.set('view engine', '.html');
app.set('views', path.join(__dirname, "resources/views"));

route(app)


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
import express from 'express';
import morgan from 'morgan'; // in ra terminal các truy cập vào server
import { engine } from 'express-handlebars'; // bóc engine từ object export
import methodOverride from 'method-override'; // ghi đè các phương thức http (vì html chỉ hỗ trợ post và get)

import path from 'path';
import { fileURLToPath } from 'url';

import route from './routes/route.js';
import { connectMongo } from './config/db/configMongo.js';
import sortMiddleware from './middlewares/sortMiddleware.js';

const __filename = fileURLToPath(import.meta.url); // đường dẫn đến file index.js
const __dirname = path.dirname(__filename); // xóa index.js trong đường dẫn
const app = express();
const port = 3030;

connectMongo(); // kết nối với mongo database

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // tải các file static

// xử lí post
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//

app.use(methodOverride('_method')); // chuyển phương thức API



app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        encoding: 'utf-8',
        partialsDir: {
            dir: path.join(__dirname, 'resources', 'views', 'partials'),
        },
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        helpers: {
            sum: (a, b) => a + b, // thêm chức năng cho file hbs
            sortable: (field, sort)=>{
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: "oi oi-elevator",
                    asc: "oi oi-sort-ascending",
                    desc: "oi oi-sort-descending",
                }
                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return (
                `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>` )
            }
        },
    }),
); // cấu hình handlebars
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app); // chạy hàm gọi các route

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});

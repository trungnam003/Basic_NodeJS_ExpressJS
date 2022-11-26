export default function sortMiddleware(req, res, next) {
    // res.locals là trả về các biến local trong res chỉ đc sử dụng trong res đó
    res.locals._sort = {
        enable: false,
        type: 'default',
        column: '',
    };
    if (req.query.hasOwnProperty('_sort')) {
        const isValidTypeSort = ['desc', 'asc'].includes(req.query.type);
        const typeSort = isValidTypeSort ? req.query.type : 'asc';
        Object.assign(res.locals._sort, {
            enable: true,
            type: typeSort,
            column: req.query.column,
        });
    }
    next();
}

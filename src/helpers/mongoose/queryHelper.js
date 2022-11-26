export default {
    sortable(req) {
        const isValidTypeSort = ['desc', 'asc'].includes(req.query.type);
        const typeSort = isValidTypeSort ? req.query.type : 'asc';
        if (req.query.hasOwnProperty('_sort')) {
            return this.sort({
                [req.query.column]: typeSort,
            });
        }
        return this;
    },
};

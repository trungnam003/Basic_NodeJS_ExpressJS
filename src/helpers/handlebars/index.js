import Handlebars from 'handlebars';

export default {
    sum: (a, b) => a + b, // thêm chức năng cho file hbs
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const types = {
            default: 'asc',
            asc: 'desc',
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );
        const output = `<a href="${href}">
        <span class="${icon}"></span>
        </a>`;
        return new Handlebars.SafeString(output);
    },
};

const yup = require('yup');

// Documentation de Yup
// https://github.com/jquense/yup#getting-started

const genreValidator = yup.object().shape({
    name: yup.string().required().trim().min(2).max(50),
    desc: yup.string().nullable().trim().max(1000, 'C\'est trop long fieu!')
});

module.exports = {
    genreValidator
};
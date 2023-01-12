const yup = require('yup');

const artistValidator = yup.object().shape({
    pseudo: yup.string().nullable().trim().min(2).max(50),
    firstName: yup.string().nullable().trim().min(2).max(50),
    lastName: yup.string().nullable().trim().min(2).max(50),
    birthday: yup.date().nullable(),
    country: yup.string().nullable().trim().min(2).max(50)
});


module.exports = {
    artistValidator
};
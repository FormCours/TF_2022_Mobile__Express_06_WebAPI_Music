const yup = require('yup');


const regexPwd = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+)/;
const regexPwdError = 'Mot de passe trop faible (╯°□°）╯︵ ┻━┻';

const memberRegisterValidator = yup.object().shape({
    email: yup.string().trim().required().email().max(200),
    password: yup.string().min(8).matches(regexPwd, regexPwdError).required()
});

const memberLoginValidator = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().required()
});


module.exports = {
    memberRegisterValidator,
    memberLoginValidator
};

const validationMethods = ['body','params','query']


const validationFun = (schema) => {

    return (req, res, next) => {
        var validationErrorArr = []
        validationMethods.forEach((key) => {
            if (schema[key]) {
                const validateData = schema[key].validate(req[key],{abortEarly:false})
                if (validateData.error) {
                    validationErrorArr.push(validateData.error.details);
                }
            }
        });
        if (validationErrorArr.length) {
            res.json({ message: "validaton error", err: validationErrorArr });
        } else {
            next()
        }
    }
}

module.exports = validationFun;
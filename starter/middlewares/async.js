const asyncWrapper = (fn) => {
     return async function abc(req,res, next) {
        try {
            return await fn(req, res, next)
        } catch (error) {
           return next(error);
        }
    }
}

module.exports = asyncWrapper

// function asyncWrapper(fn) {
//     return (req, res, next) => {
//         fn(req, res).catch(next);
//     };
// }


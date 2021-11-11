module.exports.monit = (req, res, next) => {
    console.log("Middleware 1 called.")
    console.log(req.path)
    next() // calling next middleware function or handler
  }
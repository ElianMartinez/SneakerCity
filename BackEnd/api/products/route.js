const {Router} = require('express')
const router = Router()
const {getAll, get} = require('./controller')

router.get('/',getAll)
router.get('/:id',get)


module.exports = router;
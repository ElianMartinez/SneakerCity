const {Router} = require('express')
const router = Router()
const {getAll, get, Post} = require('./controller')

router.get('/',getAll)
router.get('/:id',get)
router.post('/checkout',Post)


module.exports = router;
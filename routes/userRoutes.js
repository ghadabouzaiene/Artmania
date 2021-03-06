const router = require('express').Router()
const userController = require('../controllers/userController')
const { validationCheck } = require('../middlewares/dataCheckMiddleware')
const { tokenMiddleware } = require('../middlewares/tokenMiddleware')


router.post('/register', validationCheck, userController.register)
router.post('/login', validationCheck, userController.login)
router.get('/getprofile', tokenMiddleware, userController.getUserProfile)
router.get('/', userController.getUsers)
router.put('/:id', userController.BanUser)





module.exports = router
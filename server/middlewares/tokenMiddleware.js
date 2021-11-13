const jwt = require('jsonwebtoken')
const config = require('config')

const tokenMiddleware = async (req, res, next) => {
    try {
        const token = req.header("auth-token")
        if (!token)
            return res.status(401).json({ errors: [{ msg: 'UNTHORIZED OPERATION !' }] })
        const payload = await jwt.verify(token, config.get("JWT_CONFIG.SECRET"))
        req.userId = payload.sub
        next()
    }
    catch (err) {
        res.status(401).json({ errors: [{ msg: err.message }] })
    }
}

const checkAlbumOwner = async (req, res, next) => {
    try {
        const album = await Album.findOne({ _id: req.params.id, owner: req.userId })
        if (!post)
            return res.status(401).json({ err: 'not authorized !' })
        next()
    }
    catch (err) {
        return res.status(401).json({ err: err })
    }
}

module.exports = { tokenMiddleware, checkAlbumOwner }
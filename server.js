const express = require('express')
const dbConnect = require('./helpers/dbConnect')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000
dbConnect()
//middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/api/user', require('./routes/userRoutes'))

//deploy



app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`)
})
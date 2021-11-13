const express = require('express')
const dbConnect = require('./helpers/dbConnect')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './config/.env' });
const PORT = process.env.PORT| 5000
dbConnect()
//middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/api/user', require('./routes/userRoutes'))

//deploy
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`)
})
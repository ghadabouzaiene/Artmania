const mongoose = require('mongoose')

require('dotenv').config({ path: './config.env' });

const dbConnect = () => {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
        if (err) throw err
        console.log('DB Connected...')
    })
}

module.exports = dbConnect
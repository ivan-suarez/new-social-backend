const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postListItemsRoutes = require('./routes/PostListItems')
const Cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(Cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log('MongoDB database connected'))
.catch((err) => console.log(err));

app.use('/api/post', postListItemsRoutes)
app.get('/', (req, res) => res.send('Hello world'))

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
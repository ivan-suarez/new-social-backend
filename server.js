const express = require('express')
const app = express()
const {PORT, mongoURI} = require('./config/config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postListItemsRoutes = require('./routes/PostListItems')
const Cors = require('cors')

app.use(Cors())
app.use(bodyParser.json())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log('MongoDB database connected'))
.catch((err) => console.log(err));

app.use('/api/post', postListItemsRoutes)
app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
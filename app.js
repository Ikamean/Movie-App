const express = require('express')
require('dotenv').config()

const app = express()

// Heroku dynamically sets a port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5005

app.use(express.static('build'))


// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('server started on port 5005'))
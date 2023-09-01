const path = require('path')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '.env.development.local') })
}

const basePath = process.env.BASE_PATH

console.log(process.env.NODE_ENV)

var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var port = process.env.PORT || 3000

// UPLOAD FILE
const multer = require('multer')
const upload = multer()

// Configure app to use bodyParser to parse json data
var app = express()
//var server = require('http').createServer(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const imgDir = path.join(__dirname, '/img')
console.log(imgDir)
app.use(basePath + '/static', express.static(imgDir))

//NO in PRODUZIONE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    )
    next()
})

var cors = require('cors')

app.use(cors())

// Test server is working (GET http://localhost:3001)
app.get(basePath + '/', function (req, res) {
    res.json({ message: 'Hi, welcome to the server api!' })
})

// This should be well-guarded secret on the server (in a file or database).
var JWT_SECRET = process.env.JWT_SECRET

// JWT based login service.
app.post(basePath + '/login', function (req, res) {
    console.log('Requesting /login ...')

    const credentials = req.body

    // In real world credentials should be authenticated against database.
    // For our purpose it's hard-coded:
    if (
        credentials.user === process.env.UT &&
        credentials.password === process.env.PSW
    ) {
        // Once authenticated, the user profiles is signed and the jwt token is returned as response to the client.
        // It's expected the jwt token will be included in the subsequent client requests.
        const profile = { user: credentials.user, role: 'ADMIN' }
        const jwtToken = jwt.sign(profile, JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        }) // expires in 300 seconds (5 min)
        res.status(200).json({
            id_token: jwtToken,
        })
    } else {
        res.status(401).json({ message: 'Invalid user/password' })
    }
})

/**
 * Util function to extract jwt token from the authorization header
 */
function extractToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

//  Logout api.  For illustration purpose we show how to check if the request is from an authorized user by
//  verifying the jwt token included in the request header.  The same approach can be used to restrict access
//  to other (more intersting) API calls.
app.post(basePath + '/logout', function (req, res) {
    console.log('Requesting /logout ...')

    var jwtToken = extractToken(req)
    try {
        var profile = jwt.verify(jwtToken, JWT_SECRET)
        res.status(200).json({ message: `User ${profile.user} logged out` })
    } catch (err) {
        console.log('jwt verify error', err)
        res.status(500).json({ message: 'Invalid jwt token' })
    }
})

app.post(basePath + '/dati', function (req, res) {
    var jwtToken = extractToken(req)
    try {
        var profile = jwt.verify(jwtToken, JWT_SECRET)
        res.status(200).json({ message: `User ${profile.user} logged out` })
    } catch (err) {
        console.log('jwt verify error', err)
        res.status(500).json({ message: 'Invalid jwt token' })
    }
})

// -------------------------------------------------------------------------------------
// -------------------------------- DB CRUD / API --------------------------------------
// -------------------------------------------------------------------------------------

var db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/db.sqlite',
    },
    useNullAsDefault: true,
})

const { attachPaginate } = require('knex-paginate')
attachPaginate(db)

const checkToken = (req, res, next) => {
    var jwtToken = extractToken(req)
    try {
        var profile = jwt.verify(jwtToken, JWT_SECRET)
        next()
    } catch (err) {
        console.log('jwt verify error', err)
        res.status(500).json({ message: 'Invalid jwt token' })
    }
}

// App Routes - Perizia
const perizia = require('./controllers/perizia')
app.post(basePath + '/crud_query', checkToken, (req, res) =>
    perizia.getTableDataQuery(req, res, db)
)
app.get(basePath + '/crud', checkToken, (req, res) => perizia.getTableData(req, res, db))
app.post(basePath + '/crud', checkToken, (req, res) => perizia.postTableData(req, res, db))
app.put(basePath + '/crud', checkToken, (req, res) => perizia.putTableData(req, res, db))
app.delete(basePath + '/crud', checkToken, (req, res) =>
    perizia.deleteTableData(req, res, db)
)
app.post(basePath + '/crudClone', checkToken, (req, res) =>
    perizia.postCloneTableData(req, res, db)
)

// App Route - Singola Perizia - PUBLIC
app.post(basePath + '/perizia', (req, res) => perizia.postPerizia(req, res, db))

// Errori di coniazione
const errori = require('./controllers/errori')
app.post(basePath + '/crud_errori_query', checkToken, (req, res) =>
    errori.getTableDataQuery(req, res, db)
)
app.get(basePath + '/crud_errori', checkToken, (req, res) =>
    errori.getTableData(req, res, db)
)
app.post(basePath + '/crud_errori', checkToken, (req, res) =>
    errori.postTableData(req, res, db)
)
app.put(basePath + '/crud_errori', checkToken, (req, res) =>
    errori.putTableData(req, res, db)
)
app.delete(basePath + '/crud_errori', checkToken, (req, res) =>
    errori.deleteTableData(req, res, db)
)

// App Routes - Immagini
const immagini = require('./controllers/immagini')
app.get(basePath + '/crud_immagini', (req, res) => immagini.getTableData(req, res, db))
app.delete(basePath + '/crud_immagini', checkToken, (req, res) => {
    immagini.deleteTableData(req, res, db)
})

// -------------------------------------------------------------------------------------
// --------------------------------- UPLOAD FILE ---------------------------------------
// -------------------------------------------------------------------------------------

// creating POST endpoint /file
app.post(basePath + '/upload_file', checkToken, upload.single('file'), (req, res) => {
    console.log('body', req.file.length, req.file)
    immagini.postTableData(req, res, db)
})

// -------------------------------------------------------------------------------------
// --------------------------------- START SERVER --------------------------------------
// -------------------------------------------------------------------------------------

// Start the server
//server.listen(port)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

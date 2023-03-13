const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const session = require('express-session')

const methodOverride = require('./middlewares/method_override')
const logger = require('./middlewares/logger')
const dishController = require('./controllers/dish_controller')
const sessionController = require('./controllers/session_controller')
const setCurrentUser = require('./middlewares/set_current_user')
const viewHelpers = require('./middlewares/view_helpers')


app.set(express.static('public'))

app.set('view engine', 'ejs')

app.use(logger)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // body parser - parses req.body
app.use(methodOverride)// must be called after urlencoded
app.use(session({
    secret: 'process.env.SESSION_SECRET || mistyrose',
    resave: false,
    saveUninitialized: true,
}))

app.use(setCurrentUser)

app.use(viewHelpers)

app.use('/', sessionController)
app.use('/', dishController)


app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})


// http methods - get post put patch delete
// tim
// CRUD app

/*
*          database     http
* create    insert      post
* read      select      get
* update    update      put/patch
* destroy   delete      delete
*
* HTTP is stateless - doesnt remember the previous request
* MVC - Model view controllers - separation of concerns
*  resources you're working with - dishes, users, 
*/
const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')
const db = require('./../db')


router.get('/', (req, res) => {
    console.log(req.user)
    const sql = 'SELECT * FROM dishes;'

    // query and root can't have the same response tag 'res'
    db.query(sql, (err, dbRes) => {
        let dishes = dbRes.rows // dbRes.rows give us an ARRAY
        let email = req.session.email
        res.render('home', { dishes, email })
    })
})

router.get('/dishes/new', ensureLoggedIn, (req, res) => { // /share is tem path you want to go
    res.render('share') // render is the ejs file you want to use to display the /share path
})

router.get('/dishes/:id', ensureLoggedIn, (req, res) => {

    // $1, $2, etc...avoid a hacker delete you db
    let sql = `select * from dishes where id = $1;`
    // 
    db.query(sql, [req.params.id], (err, dbRes) => {
        const dish = dbRes.rows[0] // [0] because .rows always returns an ARRAY
        res.render('dish_details', { dish })
    })
})

// get post redirect - always redirect to a .get route after use a .post route
// prepare the message we're sending to the db
router.post('/dishes', ensureLoggedIn, (req, res) => {

    // test if user is logged in otherwise redirects it to login page 
    if (!req.session.userId) {
        res.redirect('/login')
        return
    }

    const sql = `INSERT INTO dishes (title, imagem_url, user_id) values ($1, $2, $3);`
    //req.body is the query to get info
    db.query(sql, [req.body.title, req.body.imagem_url, req.session.userId], (err, dbRes) => {
        res.redirect('/')
    })
})

router.get('/dishes/:dish_id/edit', (req, res) => {
    // fetch the record for his dish
    // so i can use it in the form template
    const sql = `SELECT * FROM dishes WHERE id = $1`
    db.query(sql, [req.params.dish_id], (err, dbRes) => {

        if (err) {
            console.log(err)
        } else {
            const dish = dbRes.rows[0]
            res.render('edit_dish', { dish: dish })
        }

    })

})

router.put('/dishes/:dish_id/edit', (req, res) => {
    const sql = `UPDATE dishes SET title = $1, imagem_url = $2 WHERE id = $3;`

    db.query(sql, [req.body.title, req.body.imagem_url, req.params.dish_id], (err, dbRes) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect(`/dishes/${req.params.dish_id}`)
        }
    })
})

router.delete('/dishes/:dish_id', (req, res) => {
    // console.log(req.params.dish_id)


    const sql = `DELETE FROM dishes WHERE id = $1;`
    // console.log(sql)
    db.query(sql, [req.params.dish_id], (err, dbRes) => {
        res.redirect('/')
    })
    // res.send('dish delete')
})

module.exports = router
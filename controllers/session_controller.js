const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./../db')

router.get('/login', (req, res) => {
    res.render('login')
}) // session

router.post('/sessions', (req, res) => {
    console.log(req.session)
    // creating a new session - logging in

    const email = req.body.email
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE email = '${email}';`

    console.log(email)
    db.query(sql, (err, dbRes) => {

        if (dbRes.rows.length === 0) {
            // no good, user doesnt exist in the users table, stay at login page
            res.render('login')
            return
        }

        const user = dbRes.rows[0]

        bcrypt.compare(password, dbRes.rows[0].password_digest, (err, result) => {
            if (result) {
                // check your id
                req.session.userId = user.id

                res.redirect('/')
            } else {
                res.render('login')
            }
        })

    })
})

router.delete('/sessions', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router
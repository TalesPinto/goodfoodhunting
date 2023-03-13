// i want currentUser to be available in all my views

function setCurrentUser(req, res, next) {
    const db = require('./../db')// require a folder without a file, by default look for a file named index.js
    const { userId } = req.session
    res.locals.currentUser = {}

    if (userId) {
        // user is logged in - setup currentUser object
        const sql = `SELECT id, email FROM users WHERE id = ${userId}`

        db.query(sql, (err, dbRes) => {
            if (err) {
                console.log(err)
            } else {
                res.locals.currentUser = dbRes.rows[0] // locals make it available everywhere
                next()
            }
        })
    } else {
        next()
    }
}

module.exports = setCurrentUser

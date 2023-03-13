const db = require('./../db')
const bcrypt = require('bcrypt')


const email = 'dt2@ga.com'
const plainTextPassword = 'pudding2'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        // // the digested password is what we want to save in db
        // console.log(digestedPassword);
        const sql = `INSERT INTO users (email, password_digest) VALUES('${email}', '${digestedPassword}');`

        db.query(sql, (err, dbRes) => {
            console.log(err)
        })
    })

})
function ensureLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next()
    }
    res.redirect('/login')
}

module.exports = ensureLoggedIn

// this module allows the user only to access a page if its logged in
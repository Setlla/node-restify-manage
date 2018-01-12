const router = require('./router');

router.addRoute('/login', require('./routers/user').login);

module.exports = router;
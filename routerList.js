const router = require('./router');

router.addRoute('/login', require('./routers/user').login);

//站点
router.addRoute('/addSite', require('./routers/site').addSite);
router.addRoute('/getSite', require('./routers/site').getSite);
router.addRoute('/delSite', require('./routers/site').delSite);
router.addRoute('/updateSite', require('./routers/site').updateSite);


module.exports = router;
const router = require('./router');

router.addRoute('/login', require('./routers/user').login);

//站点
router.addRoute('/addSite', require('./routers/site').addSite);
router.addRoute('/getSite', require('./routers/site').getSite);
router.addRoute('/delSite', require('./routers/site').delSite);
router.addRoute('/updateSite', require('./routers/site').updateSite);

//快递公司
router.addRoute('/addCompany', require('./routers/company').addCompany);
router.addRoute('/getCompany', require('./routers/company').getCompany);
router.addRoute('/delCompany', require('./routers/company').delCompany);
router.addRoute('/updateCompany', require('./routers/company').updateCompany);

module.exports = router;
const router = require('./router');

router.addRoute('/login', require('./routers/user').login);

//站点
router.addRoute('/addUpdateSite', require('./routers/site').addUpdateSite); //新增和编辑
router.addRoute('/getSite', require('./routers/site').getSite);
router.addRoute('/delSite', require('./routers/site').delSite);

//快递公司
router.addRoute('/addCompany', require('./routers/company').addCompany);
router.addRoute('/getCompany', require('./routers/company').getCompany);
router.addRoute('/delCompany', require('./routers/company').delCompany);
router.addRoute('/updateCompany', require('./routers/company').updateCompany);

module.exports = router;
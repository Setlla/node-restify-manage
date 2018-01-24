const router = require('./router');

router.addRoute('/login', require('./routers/user').login);

//站点
router.addRoute('/addUpdateSite', require('./routers/site').addUpdateSite); //新增和编辑
router.addRoute('/getSite', require('./routers/site').getSite);
router.addRoute('/delSite', require('./routers/site').delSite);

//快递公司
router.addRoute('/addUpdateCompany', require('./routers/company').addUpdateCompany);
router.addRoute('/getCompany', require('./routers/company').getCompany);
router.addRoute('/delCompany', require('./routers/company').delCompany);

//快递员
router.addRoute('/addUpdateCourier', require('./routers/courier').addUpdateCourier);
router.addRoute('/getCourier', require('./routers/courier').getCourier);
router.addRoute('/delCourier', require('./routers/courier').delCourier);

//客户
router.addRoute('/addUpdateCustomer', require('./routers/customer').addUpdateCustomer);
router.addRoute('/getCustomer', require('./routers/customer').getCustomer);
router.addRoute('/delCustomer', require('./routers/customer').delCustomer);


module.exports = router;
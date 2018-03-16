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

//快递员（小程序）
router.addRoute('/addCourierByWechat', require('./routers/courier').addCourierByWechat);
router.addRoute('/isRegisterCourier', require('./routers/courier').isRegisterCourier);

//快递员（管理系统）
router.addRoute('/updateCourier', require('./routers/courier').updateCourier);
router.addRoute('/getCourier', require('./routers/courier').getCourier);
router.addRoute('/delCourier', require('./routers/courier').delCourier);

//客户
router.addRoute('/addUpdateCustomer', require('./routers/customer').addUpdateCustomer);
router.addRoute('/getCustomer', require('./routers/customer').getCustomer);
router.addRoute('/delCustomer', require('./routers/customer').delCustomer);

//快递详情
router.addRoute('/getListExpressDetail', require('./routers/express').getListExpressDetail);

//快递录入，派发等（小程序）
router.addRoute('/addExpress', require('./routers/express').addExpress);
router.addRoute('/updateExpress', require('./routers/express').updateExpress);

//第三方快递接口
router.addRoute('/getComputerByNum', require('./services/kdniaoUtil').getComputerByNum);

//微信接口
//router.addRoute('/getWechatLogin', require('./services/wechatUtil').getWechatLogin);


module.exports = router;
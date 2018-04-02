/*
Navicat MySQL Data Transfer

Source Server         : 自动化测试程序
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : automatic_test

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-02 10:22:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(255) NOT NULL COMMENT '项目名称',
  `frontPrincipal` varchar(30) NOT NULL COMMENT '项目前端负责人',
  `deleted` tinyint(4) DEFAULT '0' COMMENT '0是默认值，1表示删除',
  `areaType` varchar(30) NOT NULL COMMENT '项目所属地区类型',
  `endPrincipal` varchar(30) DEFAULT NULL COMMENT '项目后端负责人',
  `createdTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('2', '港台平台改版', '黄富华', '0', '港台', '柯桂荣', '2018-03-05 16:01:03', '2018-03-05 16:01:03');
INSERT INTO `project` VALUES ('10', 'efunen平台改版合并', '陈小红', '0', '亚欧', '肖湘', '2018-03-05 17:03:01', '2018-03-05 17:03:01');

-- ----------------------------
-- Table structure for script
-- ----------------------------
DROP TABLE IF EXISTS `script`;
CREATE TABLE `script` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filePath` varchar(255) NOT NULL,
  `projectId` bigint(20) DEFAULT NULL,
  `testName` varchar(255) NOT NULL,
  `testDesc` varchar(500) DEFAULT NULL,
  `params` varchar(500) DEFAULT NULL,
  `createdTime` datetime DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT '0' COMMENT '0是默认值，1表示删除',
  `updateTime` datetime DEFAULT NULL,
  `lastRunTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of script
-- ----------------------------
INSERT INTO `script` VALUES ('6', '1519633147876_dc3169a5327d4.js', '1', '登录', '输入用户名密码，点击登录按钮进行登录', '[{\"name\":\"用户名\",\"key\":\"username\"},{\"name\":\"密码\",\"key\":\"password\"}]', '2018-02-26 08:19:48', '0', '2018-02-27 16:11:33', '2018-02-27 18:14:42');
INSERT INTO `script` VALUES ('7', '1519702720630_316dad31cddd3.js', '1', '进入首页，截图，点击登录图标进入登录页面，截图', '进入首页，截图，点击登录图标进入登录页面，截图', null, '2018-02-27 11:38:42', '0', '2018-02-27 16:48:56', '2018-02-27 18:14:28');
INSERT INTO `script` VALUES ('9', '1520216669948_1867429420388.js', '1', '注册', '测试注册功能111', null, '2018-03-01 18:24:00', '0', '2018-03-05 15:08:01', '2018-03-01 18:24:58');
INSERT INTO `script` VALUES ('10', '1520241496177_a976c0b9e100e.js', '2', '登录', '输入用户名密码，点击登录按钮进行登录', '[{\"name\":\"用户名\",\"key\":\"username\"},{\"name\":\"密码\",\"key\":\"password\"}]', '2018-03-05 17:18:17', '0', '2018-03-05 17:18:17', null);
INSERT INTO `script` VALUES ('11', '1520242157456_test_home.js', '2', '注册', '输入用户名和密码', '[{\"name\":\"用户名\",\"key\":\"username\"},{\"name\":\"密码\",\"key\":\"password\"}]', '2018-03-05 17:29:18', '0', '2018-03-05 17:29:18', '2018-03-14 18:30:25');

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `scriptId` bigint(20) NOT NULL,
  `resultImg` varchar(1000) DEFAULT NULL,
  `resultLog` varchar(2000) DEFAULT NULL,
  `params` varchar(200) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT '0' COMMENT '0是默认值，1表示删除',
  `createdTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('9', '6', 'home_1519634345056.jpg,click-login-btn_1519634345056.jpg,login-page_1519634345056.jpg,first-click-eye_1519634345056.jpg,second-click-eye_1519634345056.jpg,click-login-btn_1519634345056.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-26 16:39:28', '2018-02-26 16:39:28');
INSERT INTO `task` VALUES ('12', '6', 'home_1519635767776.jpg,click-login-btn_1519635767776.jpg,login-page_1519635767776.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>测试出错了 {\"generatedMessage\":false,\"name\":\"AssertionError [ERR_ASSERTION]\",\"code\":\"ERR_ASSERTION\",\"actual\":false,\"expected\":true,\"operator\":\"==\"}</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-26 17:03:23', '2018-02-26 17:03:23');
INSERT INTO `task` VALUES ('13', '6', 'home_1519699077556.jpg,click-login-btn_1519699077556.jpg,login-page_1519699077556.jpg,first-click-eye_1519699077556.jpg,second-click-eye_1519699077556.jpg,click-login-btn_1519699077556.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"guangwen1\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"guangwen1\",\"password\":\"efun168\"}', '0', '2018-02-27 10:38:13', '2018-02-27 10:38:13');
INSERT INTO `task` VALUES ('14', '6', 'home_1519710604338.jpg,click-login-btn_1519710604338.jpg,login-page_1519710604338.jpg,first-click-eye_1519710604338.jpg,second-click-eye_1519710604338.jpg,click-login-btn_1519710604338.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 13:50:26', '2018-02-27 13:50:26');
INSERT INTO `task` VALUES ('15', '7', 'home_1519710606900.jpg,login_1519710606900.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 13:50:43', '2018-02-27 13:50:43');
INSERT INTO `task` VALUES ('16', '6', 'home_1519711995831.jpg,click-login-btn_1519711995831.jpg,login-page_1519711995831.jpg,first-click-eye_1519711995831.jpg,second-click-eye_1519711995831.jpg,click-login-btn_1519711995831.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 14:13:29', '2018-02-27 14:13:29');
INSERT INTO `task` VALUES ('17', '6', 'home_1519712374907.jpg,click-login-btn_1519712374907.jpg,login-page_1519712374907.jpg,first-click-eye_1519712374907.jpg,second-click-eye_1519712374907.jpg,click-login-btn_1519712374907.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 14:19:48', '2018-02-27 14:19:48');
INSERT INTO `task` VALUES ('19', '7', 'home_1519715478331.jpg,login_1519715478331.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '0', '2018-02-27 15:11:30', '2018-02-27 15:11:30');
INSERT INTO `task` VALUES ('20', '8', 'home_1519716038689.jpg,click-login-btn_1519716038689.jpg,login-page_1519716038689.jpg,first-click-eye_1519716038689.jpg,second-click-eye_1519716038689.jpg,click-login-btn_1519716038689.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 15:20:51', '2018-02-27 15:20:51');
INSERT INTO `task` VALUES ('21', '7', 'home_1519716147795.jpg,login_1519716147795.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '0', '2018-02-27 15:22:38', '2018-02-27 15:22:38');
INSERT INTO `task` VALUES ('22', '7', 'home_1519716165429.jpg,login_1519716165429.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '0', '2018-02-27 15:22:55', '2018-02-27 15:22:55');
INSERT INTO `task` VALUES ('23', '7', 'home_1519716233959.jpg,login_1519716233959.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '0', '2018-02-27 15:24:07', '2018-02-27 15:24:07');
INSERT INTO `task` VALUES ('24', '7', 'home_1519717142872.jpg,login_1519717142872.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '0', '2018-02-27 15:39:22', '2018-02-27 15:39:22');
INSERT INTO `task` VALUES ('25', '6', 'home_1519719066439.jpg,click-login-btn_1519719066439.jpg,login-page_1519719066439.jpg,first-click-eye_1519719066439.jpg,second-click-eye_1519719066439.jpg,click-login-btn_1519719066439.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 16:11:20', '2018-02-27 16:11:20');
INSERT INTO `task` VALUES ('26', '6', 'home_1519719080807.jpg,click-login-btn_1519719080807.jpg,login-page_1519719080807.jpg,first-click-eye_1519719080807.jpg,second-click-eye_1519719080807.jpg,click-login-btn_1519719080807.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"zzwwtt\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"zzwwtt\",\"password\":\"efun168\"}', '0', '2018-02-27 16:11:33', '2018-02-27 16:11:33');
INSERT INTO `task` VALUES ('27', '7', 'home_1519721322901.jpg,login_1519721322901.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '1', '2018-02-27 16:48:56', '2018-02-27 16:48:56');
INSERT INTO `task` VALUES ('28', '7', 'home_1519721446832.jpg,login_1519721446832.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[]', '1', '2018-02-27 16:50:59', '2018-02-27 16:50:59');
INSERT INTO `task` VALUES ('29', '6', 'home_1519726440197.jpg,click-login-btn_1519726440197.jpg,login-page_1519726440197.jpg,first-click-eye_1519726440197.jpg,second-click-eye_1519726440197.jpg,click-login-btn_1519726440197.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-02-27 18:14:20', '2018-02-27 18:14:20');
INSERT INTO `task` VALUES ('30', '7', 'home_1519726443741.jpg,login_1519726443741.jpg', '<p>1.进入首页</p><p>2.进入登录页面</p>', '[{\"username\":\"efun022\",\"password\":\"efun168\"},{\"username\":\"zzwwtt\",\"password\":\"efun168\"}]', '0', '2018-02-27 18:14:28', '2018-02-27 18:14:28');
INSERT INTO `task` VALUES ('31', '6', 'home_1519726461293.jpg,click-login-btn_1519726461293.jpg,login-page_1519726461293.jpg,first-click-eye_1519726461293.jpg,second-click-eye_1519726461293.jpg,click-login-btn_1519726461293.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"zzwwtt\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"zzwwtt\",\"password\":\"efun168\"}', '0', '2018-02-27 18:14:42', '2018-02-27 18:14:42');
INSERT INTO `task` VALUES ('32', '9', 'home_1519899867310.jpg,click-login-btn_1519899867310.jpg,login-page_1519899867310.jpg,first-click-eye_1519899867310.jpg,second-click-eye_1519899867310.jpg,click-login-btn_1519899867310.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-03-01 18:24:43', '2018-03-01 18:24:43');
INSERT INTO `task` VALUES ('33', '9', 'home_1519899867310.jpg,click-login-btn_1519899867310.jpg,login-page_1519899867310.jpg,first-click-eye_1519899867310.jpg,second-click-eye_1519899867310.jpg,click-login-btn_1519899867310.jpg,home_1519899867310.jpg,click-login-btn_1519899867310.jpg,login-page_1519899867310.jpg,first-click-eye_1519899867310.jpg,second-click-eye_1519899867310.jpg,click-login-btn_1519899867310.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p><p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun111\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun111\",\"password\":\"efun168\"}', '0', '2018-03-01 18:24:57', '2018-03-01 18:24:57');
INSERT INTO `task` VALUES ('34', '11', 'home_1521012287102.jpg,click-login-btn_1521012287102.jpg,login-page_1521012287102.jpg,first-click-eye_1521012287102.jpg,second-click-eye_1521012287102.jpg,click-login-btn_1521012287102.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-03-14 15:25:07', '2018-03-14 15:25:07');
INSERT INTO `task` VALUES ('35', '11', 'home_1521023392600.jpg,click-login-btn_1521023392600.jpg,login-page_1521023392600.jpg,first-click-eye_1521023392600.jpg,second-click-eye_1521023392600.jpg,click-login-btn_1521023392600.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"efun022\",\"password\":\"efun168\"}', '0', '2018-03-14 18:30:07', '2018-03-14 18:30:07');
INSERT INTO `task` VALUES ('36', '11', 'home_1521023392600.jpg,click-login-btn_1521023392600.jpg,login-page_1521023392600.jpg,first-click-eye_1521023392600.jpg,second-click-eye_1521023392600.jpg,click-login-btn_1521023392600.jpg,home_1521023392600.jpg,click-login-btn_1521023392600.jpg,login-page_1521023392600.jpg,first-click-eye_1521023392600.jpg,second-click-eye_1521023392600.jpg,click-login-btn_1521023392600.jpg', '<p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"efun022\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p><p>1.进入页面</p><p>2.点击首页的登录按钮</p><p>3.输入账号密码{\"username\":\"zzwwtt\",\"password\":\"efun168\"}</p><p>4.第一次点击眼睛</p><p>5.第二次点击眼睛</p><p>6.点击登录按钮</p><p>7.测试完毕~~~预示测试流程顺畅</p>', '{\"username\":\"zzwwtt\",\"password\":\"efun168\"}', '0', '2018-03-14 18:30:24', '2018-03-14 18:30:24');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `deleted` tinyint(4) DEFAULT '0' COMMENT '0是默认值，1表示删除',
  `createdTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  `salt` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('7', 'dodococo', '983acd7b8cbb01c20e4b42206ac34808c9216b37', '0', '2018-03-14 16:29:50', '2018-03-14 16:29:50', '前端开发组', '1087290289231');
INSERT INTO `user` VALUES ('8', 'Esther', '555ec9a81335f264a3e270eed037959f7515d901', '0', '2018-03-14 18:22:09', '2018-03-14 18:22:09', '亚欧平台部', '13694195590');

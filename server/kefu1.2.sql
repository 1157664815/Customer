/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.5.29-log : Database - kefu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `v_admin` */

DROP TABLE IF EXISTS `v_admin`;

CREATE TABLE `v_admin` (
  `v_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v_name` varchar(11) NOT NULL COMMENT '账号',
  `v_passwd` varchar(64) NOT NULL COMMENT '密码',
  `v_power` varchar(2) DEFAULT NULL COMMENT '权限',
  `v_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '登录时间',
  `v_state` varchar(10) NOT NULL DEFAULT '0' COMMENT '在线状态（0离线）',
  `v_token` varchar(64) DEFAULT NULL COMMENT '令牌',
  PRIMARY KEY (`v_name`),
  KEY `v1_id` (`v_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `v_admin` */

insert  into `v_admin`(`v_id`,`v_name`,`v_passwd`,`v_power`,`v_time`,`v_state`,`v_token`) values (1,'admin','e10adc3949ba59abbe56e057f20f883e','0','2019-11-28 17:17:54','0','28a30475ec698e9fab95671eda16bf5b');

/*Table structure for table `v_institution` */

DROP TABLE IF EXISTS `v_institution`;

CREATE TABLE `v_institution` (
  `v2_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v2_title` varchar(100) NOT NULL COMMENT '机构名称',
  `v2_pname` varchar(32) NOT NULL COMMENT '联系人姓名',
  `v2_phone` varchar(18) NOT NULL COMMENT '联系人电话',
  `v2_website` varchar(64) NOT NULL COMMENT '机构网站',
  `v2_itype` varchar(32) NOT NULL COMMENT '行业类型',
  `v2_item` varchar(100) NOT NULL COMMENT '经营项目',
  `v2_fund` varchar(12) NOT NULL COMMENT '注册资金',
  `v2_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  KEY `v2_id` (`v2_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `v_institution` */

/*Table structure for table `v_institution_user` */

DROP TABLE IF EXISTS `v_institution_user`;

CREATE TABLE `v_institution_user` (
  `v_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v_name` varchar(11) NOT NULL COMMENT '管理员账户',
  `v_passwd` varchar(64) NOT NULL COMMENT '管理员密码',
  `v_form` varchar(100) NOT NULL COMMENT '所属机构',
  `v_power` varchar(2) NOT NULL COMMENT '账号权限',
  `v_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '登录时间',
  `v_state` varchar(10) NOT NULL DEFAULT '0' COMMENT '在线状态（0离线）',
  `v_token` varchar(64) DEFAULT NULL COMMENT '登录令牌',
  PRIMARY KEY (`v_name`),
  KEY `v3_id` (`v_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `v_institution_user` */

insert  into `v_institution_user`(`v_id`,`v_name`,`v_passwd`,`v_form`,`v_power`,`v_time`,`v_state`,`v_token`) values (1,'user','e10adc3949ba59abbe56e057f20f883e','广西','2','2019-11-28 19:15:37','0','b9c59a734278b4e96e7337156b3c29fb'),(2,'user2','e10adc3949ba59abbe56e057f20f883e','南宁','3','2019-11-28 18:27:42','0',NULL);

/*Table structure for table `v_kefu_user` */

DROP TABLE IF EXISTS `v_kefu_user`;

CREATE TABLE `v_kefu_user` (
  `v_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `v_name` varchar(11) NOT NULL COMMENT '客服账号',
  `v_passwd` varchar(64) NOT NULL COMMENT '客服密码',
  `v_title` varchar(100) NOT NULL COMMENT '客服昵称',
  `v_form` varchar(100) NOT NULL COMMENT '所属机构',
  `v_power` varchar(2) NOT NULL COMMENT '账号权限',
  `v_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '登录时间',
  `v_state` varchar(10) NOT NULL DEFAULT '0' COMMENT '在线状态（0离线）',
  `v_token` varchar(64) DEFAULT NULL COMMENT '登录令牌',
  PRIMARY KEY (`v_name`),
  KEY `v4_id` (`v_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `v_kefu_user` */

insert  into `v_kefu_user`(`v_id`,`v_name`,`v_passwd`,`v_title`,`v_form`,`v_power`,`v_time`,`v_state`,`v_token`) values (1,'kefu','e10adc3949ba59abbe56e057f20f883e','呵呵','广西职业技术学院','4','2019-11-28 18:04:36','1',NULL),(2,'kefu2','e10adc3949ba59abbe56e057f20f883e','哈哈','广西职业技','4','2019-11-28 18:04:47','0',NULL);

/*Table structure for table `v_knowledge` */

DROP TABLE IF EXISTS `v_knowledge`;

CREATE TABLE `v_knowledge` (
  `v6_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v6_form` varchar(100) NOT NULL COMMENT '所属机构',
  `v6_key` varchar(100) NOT NULL COMMENT '关键词',
  `v6_content` text NOT NULL COMMENT '回复内容',
  `v6_type` varchar(10) DEFAULT NULL COMMENT '消息类型',
  `v6_executor` varchar(64) DEFAULT NULL COMMENT '添加执行者',
  `v6_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`v6_key`),
  KEY `v6_id` (`v6_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `v_knowledge` */

/*Table structure for table `v_news` */

DROP TABLE IF EXISTS `v_news`;

CREATE TABLE `v_news` (
  `v5_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v5_user_name` varchar(11) NOT NULL COMMENT '用户账号',
  `v5_kefu_name` varchar(11) NOT NULL COMMENT '客服账号',
  `v5_content` text NOT NULL COMMENT '消息内容',
  `v5_type` varchar(10) NOT NULL COMMENT '消息类型',
  `v5_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '消息时间',
  `v5_form` varchar(100) NOT NULL COMMENT '所属机构',
  KEY `v5_id` (`v5_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `v_news` */

/*Table structure for table `v_power` */

DROP TABLE IF EXISTS `v_power`;

CREATE TABLE `v_power` (
  `v0_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `v0_sign` varchar(10) NOT NULL COMMENT '标识',
  `v0_title` varchar(32) DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`v0_sign`),
  KEY `v0_id` (`v0_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `v_power` */

insert  into `v_power`(`v0_id`,`v0_sign`,`v0_title`) values (1,'0','公司最高级'),(2,'1','公司管理员'),(3,'2','机构最高级'),(4,'3','机构管理员'),(5,'4','客服');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

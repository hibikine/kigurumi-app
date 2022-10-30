CREATE DATABASE IF NOT EXISTS `kiguapp` CHARACTER SET utf8mb4 COLLATE utf8mb4_ja_0900_as_cs_ks;
CREATE DATABASE IF NOT EXISTS `kiguapp_shadow` CHARACTER SET utf8mb4 COLLATE utf8mb4_ja_0900_as_cs_ks;
GRANT ALL ON kiguapp.* TO 'kiguapp'@'%';
GRANT ALL ON kiguapp_shadow.* TO 'kiguapp'@'%';
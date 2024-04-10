# paper-api

##  Update Server Packages

```shell
$ sudo apt -y update && sudo apt -y upgrade
```

## Install Required Packages

```shell
$ sudo apt install build-essential g++ make python2.7 git redis-server mysql-server
```

## Install NVM

```shell
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

```shell
$ source ~/.bashrc
```

## Install Node

```shell
$ nvm install v18.20.1
```

## Install Required NPM Packages

```shell
$ npm install node-gyp@latest pm2@latest -g
```

```shell
$ cd ~ && git@github.com:webber0928/paper-api.git
```

```shell
$ cd paper-api && npm install
```

## Create Database

 **WARNING**: if you want to install mysql 8, please follow below
```
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

https://blog.csdn.net/zhengbin9/article/details/82729861

https://dev.mysql.com/doc/refman/8.0/en/option-files.html

https://stackoverflow.com/questions/51958286/cannot-find-bind-address-in-my-conf-of-mysql-8-0

https://stackoverflow.com/questions/11223235/mysql-root-access-from-all-hosts
```

**get default user and password**

```shell
$ sudo cat /etc/mysql/debian.cnf
```

**login**

```shell
$ mysql -u [default user] -p
```

**change root password**

```mysql
mysql> use mysql;
```

```mysql
mysql> UPDATE user SET plugin='mysql_native_password' WHERE User='root';
```

```mysql
mysql> UPDATE mysql.user SET authentication_string=PASSWORD('[PASSWORD]') WHERE USER='root';
```

```mysql
mysql> FLUSH PRIVILEGES;
```

```mysql
mysql> exit;
```

**create new database**

```shell
$ mysql -u root -p
```

```mysql
mysql> create database [DATABASE_NAME];
```

```mysql
mysql> exit;
```

## Databases First Initialization

```shell
$ NODE_ENV=[ENVIROMENT] npx sequelize db:migrate
```
## Databases Migrate

```shell
$ NODE_ENV=[ENVIROMENT] npx sequelize db:migrate
```

## Databases Downgrate

```shell
$ NODE_ENV=[ENVIROMENT] npx sequelize db:migrate:undo
```

## Databases Create Default Data

```shell
$ NODE_ENV=[ENVIROMENT] npx sequelize-cli db:seed --seed 20200831072317-import-general-data.js
```

## Start Project On Local

```shell
$ npm run general-api
```

## Start Project With PM2 On Server

**stop & delete all pm2 process**

```shell
$ pm2 stop all && pm2 delete all
```

**start api with pm2**

```shell
$ NODE_ENV=[ENVIROMENT] pm2 start bin/abt-admin-api.js --name "dev-admin"
```

**reload all pm2 process**

```shell
$ pm2 reload all
```

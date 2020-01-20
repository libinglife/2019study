#Dockerfile  
#创建自己的pm2 docker 镜像

#制定node镜像版本
FROM keymetrics/pm2:latest-alpine

#移动当前目录下面的文件到app目录下
ADD . /usr/src/app

#进入到app，目录下 类似cd
WORKDIR /usr/src/app

# 安装依赖
RUN npm config set registry https://registry.npm.taobao.org/ && \
    npm install

#对外暴露端口号
EXPOSE 3005

#启动程序
CMD ["pm2-runtime","start","process.yml"]


#Dockerfile  
#创建自己的docker 镜像

#制定node镜像版本
FROM node:10-alpine

#移动当前目录下面的文件到app目录下
ADD . /app/

#进入到app，目录下 类似cd
WORKDIR /app

# 安装依赖
RUN npm install

#对外暴露端口号
EXPOSE 3003

#启动程序
CMD ["node","app.js"]


#Dockerfile
#创建自己的镜像 docker build -t mynginx .
#执行自己的镜像 docker run -d -p 8082:80 mynginx
FROM nginx:latest
# RUN echo '<h1>Hello, Kaikeba!</h1>' > /usr/share/nginx/html/index.html

#指定文件路径
ADD ./www/index.html /usr/share/nginx/html/index.html  
# 使用Node.js 14的Alpine版本作为基础镜像
FROM node:14-alpine

# 设置工作目录为/usr/src/app
WORKDIR /usr/src/app

# 定义一个构建参数NODE_ENV，用于指定Node.js的环境
ARG NODE_ENV
# 将构建参数NODE_ENV的值设置为环境变量NODE_ENV
ENV NODE_ENV $NODE_ENV

# 将package.json和package-lock.json复制到工作目录
COPY package*.json /usr/src/app/
# 运行npm install安装依赖
RUN npm install

# 将当前目录下的所有文件复制到工作目录
COPY . /usr/src/app

# 设置环境变量PORT为5000
ENV PORT 5000
# 暴露容器的5000端口
EXPOSE $PORT
# 定义容器启动时执行的命令
CMD [ "npm", "start" ]

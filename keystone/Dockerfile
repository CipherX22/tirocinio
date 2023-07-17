FROM node:18.16.1
COPY package*.json /app/
WORKDIR /app
RUN yarn
RUN yarn build
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]

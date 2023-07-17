FROM node:18.16.1
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]

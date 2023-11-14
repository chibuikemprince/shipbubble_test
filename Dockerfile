FROM node:16-alpine             
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install     
COPY . .                             
CMD npm run migrate && npm start && npx sequelize-cli db:migrate
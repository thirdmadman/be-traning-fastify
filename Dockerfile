FROM node:14

WORKDIR /app

COPY . .

RUN npm install --no-progress --quiet
RUN npm run build

CMD [ "npm", "start", "--silent" ]
FROM node:20

WORKDIR /api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]

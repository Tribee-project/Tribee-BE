FROM node:23
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000
CMD ["npm", "start"]
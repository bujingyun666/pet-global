FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=4174
ENV DATABASE_PATH=./data/petglobal.sqlite

EXPOSE 4174

CMD ["npm", "start"]

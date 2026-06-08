FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=4174
ENV DATABASE_PATH=/opt/render/project/src/data/petglobal.sqlite
ENV UPLOAD_DIR=/opt/render/project/src/data/uploads

EXPOSE 4174

CMD ["npm", "start"]

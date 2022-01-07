FROM node:16

ENV REACT_APP_BACKEND_URL=http://localhost:5000

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

# docker build . -t todo-frontend && docker run -p 3001:3000 todo-frontend
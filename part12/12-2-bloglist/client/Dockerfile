FROM node:16 as test

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run lint

FROM test as run

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3003

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

# docker build . -t client && docker run -p 3000:3000 client
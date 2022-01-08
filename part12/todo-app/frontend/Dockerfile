FROM node:16

ENV REACT_APP_BACKEND_URL=http://localhost:5001

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

# docker build . -t frontend && docker run -p 3001:3000 frontend

# https://stackoverflow.com/questions/53681041/webpack-build-fails-with-epipe-error-linux-subsystem-only
# sudo apt-get install libpng16-dev
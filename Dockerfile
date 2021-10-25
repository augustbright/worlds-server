FROM node:14.18

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY tsconfig.json tsconfig.build.json nest-cli.json /code/
COPY src /code/src

CMD ["npm", "start"]
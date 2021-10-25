## Running the app

```bash
# docker
$ docker run -d -p:3000:3000 --env-file .env -v $(pwd)/src:/code/src/ worlds-server

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

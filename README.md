# setup

build docker images
```
docker compose build
```

start containers
```
docker compose up -d
```


# start server


### backend server

```
docker exec -it tgm-backend-container bash
python3 manage.py runserver 0.0.0.0:8080
```

django server start on localhost:8080 in your web browser.


### frontend server

```
docker exec -it tgm-frontend-container bash
npm run dev
```

nextjs server start on localhost:8000 in your web browser.

# syntax=docker/dockerfile:1
FROM python:3.7-buster
WORKDIR /Backend
COPY . .
RUN pip3 install --use-deprecated=legacy-resolver -r config/requirements.txt 

RUN pip3 install -e . && cd ./app/db/ && python3 database_setup.py

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0","--port=5001"]
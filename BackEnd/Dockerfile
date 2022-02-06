# syntax=docker/dockerfile:1
FROM python:3.7-buster
WORKDIR /Backend
COPY . .
RUN pip3 install --use-deprecated=legacy-resolver -r config/requirements.txt 
<<<<<<< HEAD
RUN pip3 install -e . && cd ./app/db/ && python3 database_setup.py
=======
RUN pip3 install -e . && python3 ./app/db/database_setup.py
>>>>>>> b1c29796 (update with new master changes)
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0","--port=5001"]
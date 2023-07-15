FROM python:3.9
USER root

RUN mkdir /python_project
WORKDIR /python_project
RUN apt-get update &&\
    apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

# 必要なパッケージのインストール
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt 

COPY ./src ./src
COPY ./index ./index
COPY main.py .


CMD ["python", "main.py"]
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_lg

COPY model_init.py .
RUN python model_init.py

COPY . .

ENTRYPOINT [ "uvicorn", "main:app", "--reload", "--port", "8080", "--host", "0.0.0.0" ]
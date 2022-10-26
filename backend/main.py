import os
import pandas as pd
import numpy as np
from fastapi import FastAPI  # File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Union
from ner import extractAndDefineEntities
from analogy import getAnalogy
from rewording import reword

from typing import Union

openai_api_key = os.environ.get('OPENAI_API_KEY')

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

data = pd.read_csv('data_all.csv')


class RewordingItem(BaseModel):
    audience: int
    text: Union[str, None] = None


@app.get("/")
def index():
    return {"message": "Hello Frontend"}


class NERItem(BaseModel):
    text: Union[str, None] = None


class AnalogyItem(BaseModel):
    target: Union[str, None] = None
    text: Union[str, None] = None


@app.get("/countries")
def get_countries():
    return data[['Country', 'Code', 'ContinentCode']].fillna('').to_dict(orient='records')


@app.get("/columns")
def get_columns():
    cols = data.drop(['Country', 'Code', 'ContinentCode'], axis=1).columns
    out = []
    for col in cols:
        if not col.endswith('|year'):
            out.append(col)
    return out


@app.post("/compare")
def get_country(country_code: str):
    return data[data['Code'] == country_code].to_dict(orient='records')[0]


@app.post("/")
def index():
    return {"message": "Hello Frontend"}


@app.post("/ner")
def entity_endpoint(item: NERItem):
    if item.text:
        entities = extractAndDefineEntities(item.text)
    return {"entities": entities}


@app.post("/analogy")
def analogy_endpoint(item: AnalogyItem):
    analogy = getAnalogy(item.target, item.text)
    return {"analogy": analogy}


@app.get("/rewording")
def get_rewording(audience: int, text: Union[str, None] = None):
    if text:
        reworded_text = reword(audience, text)
    return {"reworded_text": reworded_text}

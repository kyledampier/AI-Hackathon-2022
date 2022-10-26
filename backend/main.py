import os
import pandas as pd
import numpy as np
from fastapi import FastAPI # File, UploadFile
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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
)

class RewordingItem(BaseModel):
    audience: int
    text: Union[str, None] = None

class NERItem(BaseModel):
    text: Union[str, None] = None

class AnalogyItem(BaseModel):
    target: Union[str, None] = None
    text: Union[str, None] = None

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

@app.post("/rewording")
def get_rewording(item: RewordingItem):
    if item.text:
        reworded_text = reword(item.audience, item.text)
    return {"reworded_text" : reworded_text}

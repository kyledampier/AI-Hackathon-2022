import os
import pandas as pd
import numpy as np
from fastapi import FastAPI # File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from ner import extractAndDefineEntities
from analogy import getAnalogy
from rewording import reword

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

@app.get("/")
def index():
    return {"message": "Hello Frontend"}

from typing import Union


@app.get("/ner")
def entity_endpoint(text: Union[str, None] = None):
    if text:
        entities = extractAndDefineEntities(text)
    return {"entities": entities}


@app.get("/analogy")
def analogy_endpoint(target: Union[str, None] = None, text: Union[str, None] = None):
    analogy = getAnalogy(target, text)
    return {"analogy": analogy}

@app.get("/rewording")
def get_rewording(audience: int, text: Union[str, None] = None):
    if text:
        reworded_text = reword(text, audience)
    return {"reworded_text" : text}





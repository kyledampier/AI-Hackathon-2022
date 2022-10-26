import os
import pandas as pd
import numpy as np
from fastapi import FastAPI # File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from ner import extractAndDefineEntities

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
def get_ents(text: Union[str, None] = None):
    if text:
        entities = extractAndDefineEntities(text)
    return {"entities": entities}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}





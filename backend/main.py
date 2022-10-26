import os
import pandas as pd
import numpy as np
from fastapi import FastAPI # File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from pydantic import BaseModel

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



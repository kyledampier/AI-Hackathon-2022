
import openai
import os
from dotenv import load_dotenv
import json

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')


def complexity(code):
    response = openai.Completion.create(
        model="code-davinci-002",
        prompt=f"{code} '''Tell me the big O time complexity of this function, then stop:",
        max_tokens=15,
        temperature=0.8
    )

    x = response.choices[0]['text'].replace("\n", " ")
    return x


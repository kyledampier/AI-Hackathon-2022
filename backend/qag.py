import spacy
import requests
import torch
from transformers import PreTrainedTokenizerFast
from transformers import T5ForConditionalGeneration

tokenizer = PreTrainedTokenizerFast.from_pretrained(
    'Sehong/t5-large-QuestionGeneration')
model = T5ForConditionalGeneration.from_pretrained(
    'Sehong/t5-large-QuestionGeneration')

nlp = spacy.load("en_core_web_lg")


def getQAPair(answer, content):
    text = f"answer:{answer} content:{content}"
    raw_input_ids = tokenizer.encode(text)
    input_ids = [tokenizer.bos_token_id] + \
        raw_input_ids + [tokenizer.eos_token_id]
    question_ids = model.generate(torch.tensor([input_ids]))
    decode = tokenizer.decode(
        question_ids.squeeze().tolist(), skip_special_tokens=True)
    decode = decode.replace(' # # ', '').replace('  ', ' ').replace(' ##', '')
    return decode, answer


def getQAPairs(text):
    """ exclusionList = ['TIME', 'DATE', 'CARDINAL',
                     'PERCENT', 'MONEY', 'QUANTITY', 'ORDINAL', 'NORP']
    doc = nlp(text)
    entities = []
    ent_set = set()
    if doc.ents:
        for ent in doc.ents:
            if ent.label_ in exclusionList:
                pass
            else:
                if ent.text not in ent_set:
                    ent_set.add(ent.text)
    QA_PAIRS = []
    if ent_set:
        k = len(ent_set)
        i=1
        for ent in ent_set:
            print(f"Getting Question {i} of {k}")
            question, answer = getQAPair(ent, text)
            if len(question) > 10:

                QA_PAIRS.append([question, answer])

            i+=1 
        return QA_PAIRS
    else:
        return []
        """
    return [
        [
            "question: What journal published the study of GRBs today.",
            "Nature"
        ],
        [
            "question: What do gamma rays wash over every day without warning?",
            "Earth"
        ],
        [
            "called what light is created by ultrahigh-energy gamma rays ",
            "Cherenkov"
        ],
        [
            "What do gamma-ray bursts mean?",
            "GRB"
        ],
        [
            "question: What country discovered gamma rays in the 1960s?",
            "U.S."
        ]
    ]

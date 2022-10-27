import spacy
import requests
import re

nlp = spacy.load("en_core_web_lg")


def wikiExplainer(title, removeEscapeChars=True, explainerLength=2):
    title = str(title)
    response = requests.get(
        'https://en.wikipedia.org/w/api.php',
        params={
            'action': 'query',
            'format': 'json',
            'titles': title,
            'prop': 'extracts',
            'exintro': True,
            'exsentences': 3,
            'explaintext': True,
            'exsectionformat': 'wiki'
        }).json()
    response = requests.get(
        "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=" + title.replace(
            " ", "_") + "|" + title.replace(" ", "_") + "&redirects=").json()
    explainer = next(iter(response['query']['pages'].values()))
    if 'extract' in explainer:

        explainer = explainer['extract']
        if removeEscapeChars:
            explainer = ''.join(
                c for c in explainer if c.isalnum() or c == ' ' or c == '.')
            explainer = explainer.replace("\n", " ")

        doc = nlp(explainer)
        explainer = ""

        for j, sentence in enumerate(doc.sents):
            if(j+1 > explainerLength):
                break
            else:
                explainer += str(sentence.text) + " "
    else:
        explainer = "No Definition Found"

    doc = nlp(explainer)

    if "may refer to" in explainer:
        return "Various Definitions"
    return explainer


def extractAndDefineEntities(text):
    # show entities in text
    # 'PERSON','PRODUCT'
    exclusionList = ['TIME', 'DATE', 'CARDINAL',
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
                    s = wikiExplainer(ent.text)
                    pkg = [ent.text, str(ent.label_), s]
                    entities.append(pkg)

    if entities:

        nums = []
        import random
        for i, entity in enumerate(entities):
            text = text.replace(entity[0], f"|{i}|")

        for i, entity in enumerate(entities):
            ent_string = fr'°{entity}°'
            text = text.replace(f"|{i}|", ent_string)
        text = text.split("°")
        return text
    else:
        return 0

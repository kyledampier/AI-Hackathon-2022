import spacy
import requests

nlp = spacy.load("en_core_web_lg")




def wikiExplainer(title, removeEscapeChars=True, explainerLength=3):
    title = str(title)
    response = requests.get(
        'https://en.wikipedia.org/w/api.php',
        params={
            'action': 'query',
            'format': 'json',
            'titles': title,
            'prop': 'extracts',
            'exintro': True,
            'explaintext': True,
        }).json()
    response = requests.get(
        "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=" + title.replace(
            " ", "_") + "|" + title.replace(" ", "_") + "&redirects=").json()
    explainer = next(iter(response['query']['pages'].values()))
    if 'extract' in explainer:
        explainer = explainer['extract']
        if removeEscapeChars:
            explainer = ''.join(c for c in explainer if c.isalnum() or c == ' ' or c == '.')
            explainer = explainer.replace("\n", " ")
    else:
        explainer = ""

    doc = nlp(explainer)
    explainer = ""
    for j, sentence in enumerate(doc.sents):
        if (j + 1 > explainerLength):
            break
        else:
            explainer += str(sentence.text) + " "
    return explainer


def extractAndDefineEntities(text):
    #show entities in text
    #'PERSON','PRODUCT'
    exclusionList = [ 'TIME', 'DATE', 'CARDINAL', 'PERCENT', 'MONEY', 'QUANTITY', 'ORDINAL', 'NORP']
    doc = nlp(text)
    entities = []
    if doc.ents:
        for ent in doc.ents:
            if ent.label_  in exclusionList:
                pass
            else:
                s = wikiExplainer(ent.text)
                pkg = [ ent.text,str(spacy.explain(ent.label_)), s]
                entities.append(pkg)
    if entities:
        return entities
    else:
        return 0


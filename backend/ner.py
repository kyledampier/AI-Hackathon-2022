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
        explainer = "No Definition Found"

    doc = nlp(explainer)
    explainer = ""
    for j, sentence in enumerate(doc.sents):
        if (j + 1 > explainerLength):
            break
        else:
            explainer += str(sentence.text) + " "
    if "may refer to" in explainer:
        return "Various Definitions"
    return explainer


def extractAndDefineEntities(text):
    #show entities in text
    #'PERSON','PRODUCT'
    exclusionList = [ 'TIME', 'DATE', 'CARDINAL', 'PERCENT', 'MONEY', 'QUANTITY', 'ORDINAL', 'NORP']
    doc = nlp(text)
    entities = []
    ent_set = set()
    if doc.ents:
        for ent in doc.ents:
            if ent.label_  in exclusionList:
                pass
            else:
                if ent.text not in ent_set:
                    ent_set.add(ent.text)
                    s = wikiExplainer(ent.text)
                    pkg = [ ent.text,str(spacy.explain(ent.label_)), s]
                    entities.append(pkg)
                

    if entities:
        return entities
    else:
        return 0
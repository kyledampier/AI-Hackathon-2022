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
            explainer = ''.join(c for c in explainer if c.isalnum() or c == ' ' or c == '.')
            explainer = explainer.replace("\n", " ")
        
        doc = nlp(explainer)
        explainer = ""

        for j,sentence in enumerate(doc.sents):
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
                    print('s',s)
                    pkg = [ ent.text,str(spacy.explain(ent.label_)), s]
                    entities.append(pkg)
                

    if entities:
        # index_hash = {} #maps index to word
        # for entity in entities:
        #     indeces = [m.start() for m in re.finditer(entity[0],text)]
        #     for x in indeces:
        #         index_hash
        #     index_hash[] = indeces

        
        temp_text = ""

        for entity in entities:
            ent_string = fr'°{entity}°'
            text = text.replace(entity[0],ent_string)

        text = text.split("°")        
        return text
    else:
        return 0
import spacy
nlp = spacy.load("en_core_web_lg")
def extractEntities(text):
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
                entities.append([ ent.text,str(spacy.explain(ent.label_))])
    if entities:
        return entities
    else:
        return 0


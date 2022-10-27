from transformers import pipeline
import pickle
import os
import spacy
import re

nlp = spacy.load("en_core_web_lg")

def splitText(text):
    """
    params:
    text: text to break down

    returns:
    list of strings of the text chunks
    """

    # Detect periods
    ans = []
    num_sentences_in_chunk = 4
    ctr = 0
    lp = 0
    
    # Chunk every 4 sentences
    for i, c in enumerate(text):
        if c == '.':
            ctr += 1
            if ctr % num_sentences_in_chunk == 0 or i == len(text) - 1:
                ans.append(text[lp:i+1])
                lp = i + 1
    
    return ans

def initBARTPipeline():

    summary_pipeline = ""
    pipeline_pkl_file = "facebook-bart-large-cnn.txt"

    if (os.path.exists(pipeline_pkl_file)):
        print("Retrieving pipeline from pickle file...")
        pickle_off = open(pipeline_pkl_file, "rb")
        summary_pipeline = pickle.load(pickle_off)
    else:
        print("Initializing pipeline...")
        summary_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")

        with open(pipeline_pkl_file, 'wb') as fh:
            pickle.dump(summary_pipeline, fh)

    return summary_pipeline


def summarizeText(textList, summarizer):

    total_summary = ''

    # Need to pass through the initiated BART Pipeline
    for chunk in textList:

        chunk_summary = summarizer(chunk, min_length=20, do_sample=False)
        total_summary += f"{chunk_summary[0]['summary_text']} "
        print(chunk_summary)
    
    return total_summary

def extractEntities(total_summary):
    exclusionList = [ 'TIME', 'DATE', 'CARDINAL', 'PERCENT', 'MONEY', 'QUANTITY', 'ORDINAL', 'NORP']
    doc = nlp(total_summary)

    ent_map = {}

    print(doc.ents)
    print(list(doc.noun_chunks))
    if doc.ents:
        for ent in doc.ents:
            if ent.label_ in exclusionList:
                pass
            else:
                if ent.text in ent_map:
                    pass
                else:
                    ent_map[ent.text] = 0

    return ent_map

def filter_nouns_spacy(text, tags=['NOUN']):
    doc = nlp(text)
    output = [token.lemma_ for token in doc if token.pos_ in tags]
    return output

def getBlanks(text):

    doc = nlp(text)
    sentences = [sentence.text for sentence in doc.sents]
    subjects = {}

    print(sentences)

    for idx, sentence in enumerate(doc.sents):
        sentdoc = nlp(sentence.text)
        ctr = 0
        for sentdoc_idx, token in enumerate(sentdoc):
            if ("subj" in token.dep_):
                subtree = list(token.subtree)
                start = subtree[0].i
                end = subtree[-1].i + 1

                subject = sentdoc[start:end]

                num_spaces = 0
                subject_str = str(subject)

                for c in subject_str:
                    if c == ' ':
                        num_spaces += 1

                if num_spaces < 15:
                    subjects[idx] = subject_str
    
    # print(subjects)
    # print(len(subjects))
    # print(len(sentences))

    for idx, sentence in enumerate(sentences):
        
        # If index in subjects.keys()
        if  idx in subjects:
            #print(f"Old sentence: {sentence} ")
            repl_str = " " + '_' * len(subjects[idx]) + " "
            new_sentence = re.sub(f" {subjects[idx]} ", repl_str, sentence, count = 1)
            #print(f"New sentence: {new_sentence} ")
            sentences[idx] = new_sentence
        
    return sentences

# Create pdf
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
def pdf(sentences, filename="my_notes.pdf"):

    assert filename.endswith(".pdf")

    doc = SimpleDocTemplate(
            f"{filename}",
            pagesize=letter,
            rightMargin=60, leftMargin=35,
            topMargin=35, bottomMargin=18,
            )

    styles = getSampleStyleSheet()
    flowables = []

    title = Paragraph("Guided Notes", style=styles["Title"])
    flowables.append(title)

    for sentence in sentences:
        s = sentence + "<br />\n" + "<br />\n"
        para = Paragraph(s, style=styles["BodyText"])
        flowables.append(para)

    doc.build(flowables)

def createPDF(text):
    text = re.sub('\n', '', text)
    sentences = getBlanks(text)
    pdf(sentences)
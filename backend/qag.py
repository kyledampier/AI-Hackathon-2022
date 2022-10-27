import spacy
import requests
import torch
from transformers import PreTrainedTokenizerFast
from transformers import T5ForConditionalGeneration

tokenizer = PreTrainedTokenizerFast.from_pretrained('Sehong/t5-large-QuestionGeneration')
model = T5ForConditionalGeneration.from_pretrained('Sehong/t5-large-QuestionGeneration')

def getQAPairs(answer, content):
    # answer = "Saint Bernadette Soubirous"
    # content = "Architecturally , the school has a Catholic character . Atop the Main Building ' s gold dome is a golden statue of the Virgin Mary . Immediately in front of the Main Building and facing it , is a copper statue of Christ with arms upraised with the legend "" Venite Ad Me Omnes "" . Next to the Main Building is the Basilica of the Sacred Heart . Immediately behind the basilica is the Grotto , a Marian place of prayer and reflection . It is a replica of the grotto at Lourdes , France where the Virgin Mary reputedly appeared to Saint Bernadette Soubirous in 1858 . At the end of the main drive ( and in a direct line that connects through 3 statues and the Gold Dome ) , is a simple , modern stone statue of Mary ."
    text = f"answer:{answer} content:{content}"
    raw_input_ids = tokenizer.encode(text)
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]
    question_ids = model.generate(torch.tensor([input_ids]))
    decode = tokenizer.decode(question_ids.squeeze().tolist(), skip_special_tokens=True)
    decode = decode.replace(' # # ', '').replace('  ', ' ').replace(' ##', '')
    return decode
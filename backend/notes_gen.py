from transformers import pipeline

text = """In early October, a wave of high-energy radiation swept over Earth from a gamma-ray burst, one of the most singularly catastrophic and violent events the cosmos has to offer. Astronomers quickly determined its distance and found it was the closest such burst ever seen: a mere two billion light-years from Earth. Or, if you prefer, 20 billion trillion kilometers away from us, a decent fraction of the size of the observable universe.

To astronomers, “close” means something different. This one was so close, cosmically speaking, that it was detected by a fleet of observatories both on and above the Earth, and is already yielding a trove of scientific treasure. But even from this immense distance in human terms, it was the brightest such event ever seen in x-rays and gamma rays, bright enough to spot its visible-light emission in smaller amateur telescopes, and was even able to physically affect our upper atmosphere. Despite that, this gamma-ray burst poses no danger to us. Either way, I’m glad they keep their distance.

Gamma-ray bursts, or GRBs, are intense blasts of gamma rays—the highest-energy form of light—that typically last from a fraction of a second to a few minutes in length. Gamma-ray bursts have been a puzzle to astronomers since the Cold War, when the first was discovered in the 1960s by orbiting detectors looking for nuclear weapons tested on or above Earth. Over 1,700 have been observed since then. Still, it took decades to pin them down well enough in the sky to observe them with more conventional telescopes, and to understand better what they were. Even then it was difficult, as each GRB has idiosyncrasies, making them complicated to understand as a group.

Still, we do have a decent grasp of their basic nature. Short-duration bursts—generally a few seconds long at most—come from two superdense neutron stars colliding and blasting out fierce energy, whereas long-duration ones—lasting several minutes—come from massive stars exploding at the ends of their lives. The core of the star collapses, forming a black hole. A swirling disk of material that wasn’t immediately swallowed by the black hole rapidly forms around it, funneling twin beams of intense energy out into space, one pointing up and the other down, away from the disk. These eat their way through the dying star and erupt outward while the rest of the star explodes as a very powerful supernova.
"""

def splitText(text):
    """
    params:
    text: text to break down

    returns:
    list of strings of the text chunks
    """

    # Detect periods
    ans = []
    ctr = 0
    for i, c in enumerate(text):
        lp = 0
        if c == '.':
            ctr += 1
            if ctr % 3 == 0 or i == len(text) - 1:
                ans.append(text[lp:i+1])
                lp = i + 1
    
    return ans

def summarizeText(textList):

    # Setup BART pipeline
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


print(text)
print(splitText(text))
#print(summarizer(text, min_length=20, do_sample=False))
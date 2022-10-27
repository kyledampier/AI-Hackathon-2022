import pandas as pd
import numpy as np

df = pd.read_csv('data_all.csv')
df = df.fillna('')
df_2 = df.drop(['Country', 'Code', 'ContinentCode'], axis=1)

cols = df_2.columns
cols_out = []
bigger_is_better = []

for col in cols:
    if not col.endswith('|year'):
        print(f"--- {col} ---")
        cols_out.append(col)
        print(df[['Country', col]].head(5))
        inp = int(input("1 for bigger is better, 2 for smaller is better: "))
        if inp == 1:
            bigger_is_better.append(True)
        else:
            bigger_is_better.append(False)

print(cols_out)
bigger_is_better = np.array(bigger_is_better)
arr = np.array([cols_out, bigger_is_better]).T
print(arr)
out = pd.DataFrame(arr, columns=['column', 'bigger_is_better'])
out.to_csv('data_mapping.csv', index=False)

# Student teacher ratio primary school
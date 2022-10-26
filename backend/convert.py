import os
import pandas as pd

dir_path = os.path.join("data")
files = os.listdir(dir_path)

id_cols = ['Country', 'Code', 'ContinentCode', 'Year']


def get_csv_details(filename, codes):
    df = pd.read_csv(os.path.join(dir_path, filename))
    out = codes.copy()

    for col in df.columns:
        if not col in id_cols:
            cols = id_cols + [col]
            tmp = df[cols].dropna()
            max_years = tmp.groupby(['Code'])['Year'].max()
            tmp = tmp.merge(max_years, on=['Code', 'Year'], how='right')
            year_col = f'{col}|year'
            tmp[year_col] = tmp['Year']
            tmp[col] = tmp[col].astype(float)
            tmp.drop(['Year', 'Country', 'ContinentCode'],
                     axis=1, inplace=True)
            out = out.merge(tmp, on=['Code'], how='right')

    return out.drop(['Country', 'ContinentCode'], axis=1)


if __name__ == '__main__':
    data_all = pd.DataFrame()
    for f in files:
        if f.endswith(".csv"):
            data = pd.read_csv(os.path.join(dir_path, f))
            if len(data.columns) == 0:
                data_all = data
            else:
                data_all = pd.concat([data_all, data], axis=0)

    data = data_all[['Country', 'Code', 'ContinentCode']].drop_duplicates()
    codes = data.copy()

    count = 1
    for f in files:
        if f.endswith(".csv") or f != 'data_14.csv':
            print(f"--- Processing {f} ({count}/{len(files)}) ---")
            count += 1
            df = get_csv_details(f, codes)
            data = data.merge(df, on=['Code'], how='left')

    data.to_csv('data_all.csv', index=False)
    print(data.describe().T)

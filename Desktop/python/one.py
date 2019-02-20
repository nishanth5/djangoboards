import json
import ast
from pprint import pprint
with open('input.json') as f:
    data = json.load(f)
    #json.loads(data, cls=Decoder)
    data1=ast.literal_eval(json.dumps(data))
for i in data1:
    i['grand_total'] = float(i['grand_total'])
    i['created_at'] = int(i['created_at'])

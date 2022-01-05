import json
  
# JSON string:
dict_1 = {
    "Name": "Felix Maina",
    "Contact Number": "0712345678",
    "Email": "fely@gmail.com",
    }
  
# parse dict_1:
y = json.loads(dict_1)
# the result is a Python dictionary:
print(y)

import json

data = {
    'Name' : 'Felix',
    'Occupation' : 'Doctor'
}
dict_1 = json.dumps(data) # converting dictionary to JSON
print(dict_1)   # {'Name' : 'Felix','Occupation' : 'Doctor'}
filename = 'jsonFile.json'
with open(filename, 'w') as file_object:  #open the file in write mode
    dict_1
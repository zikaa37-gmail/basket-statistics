import json  
  
with open('r','student.json') as file_object:  
  data = json.load(file_object)  
print(data) 
import json
from pymongo import MongoClient

client = MongoClient('hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017', 27017)
db = client['dolphin']
collection = db['Users']

with open("sample.json") as f:
    file_data = json.load(f)

collection.insert_one(file_data)
client.close()

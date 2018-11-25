# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
from pymongo import MongoClient
from flask import Flask, request, jsonify
from .authFuncs import charge_credit_card, credit_bank_account

app = Flask(__name__)

# create a user  phone# password
@app.route('/create_user', methods=['POST'])
def create_user():
    try:
        client = MongoClient('mongodb://admin:admin@hackwestern-shard-00-00-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-02-4qcqm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=hackWestern-shard-0&authSource=admin')
        db = client['Dolphin']
        collection = db['Users']
    except:
        return 'error connecting to mongo!'
    finally:
        client.close()
    
    user = {"wallet_id": request.data["wallet_id"],
            "password": request.data["password"],
            "balance": 0,
            "in_app_transactions": [],
            "out_app_transactions": [] }
    
    collection.insert_one(user)
    client.close()
    
# updates database transations from local chirp
@app.route('/update_transactions', methods=['POST'])
def transaction_data():
    pass

# updates a users balance
@app.route('/update_user', methods=['POST'])
def user_data():
    pass

# withdraw money from Dolphin
@app.route('/withdraw', methods=['POST'])
def withdraw_data():
    return credit_bank_account(request.data)

# deposit money to Dolphin
@app.route('/deposit', methods=['POST'])
def deposit_data():
    return charge_credit_card(request.data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

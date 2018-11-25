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

# [START gae_python37_app]
from flask import Flask, request, jsonify


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

@app.route('/', methods=['POST'])
def get_data():
    auth_data={
	    "createTransactionRequest":{
	        "merchantAuthentication":{
	            "name":"2U6x9AuE",
	            "transactionKey":"5KY6z6r64HtK8kgv"
	        },
	        "transactionRequest":{
	            "transactionType": "authCaptureTransaction",
	            "amount":request.data["amount"],
	            "payment":{
	                "creditCard":{
	                    "cardNumber":request.data["cardNumber"],
	                    "expirationDate":request.data["expirationDate"],
	                    "cardCode":request.data["cardCode"]
	                }
	            }
	        }
	    }
	}
   	req = request.post('https://apitest.authorize.net/xml/v1/request.api', data=auth_data)
    return req


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='0.0.0.0', port=80)
# [END gae_python37_app]

import requests

info = {"amount" : 5,
        "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999" }
        }

r = requests.post("http://35.231.228.196:5000/", json=info)
print(r)
print(r.text)

data = r.text



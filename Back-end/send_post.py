import requests

info = {"amount" : 5,
        "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999" }
        }

r = requests.post("http://127.0.0.1:8080/", json=info)
print(r)
print(r.text)

data = r.text



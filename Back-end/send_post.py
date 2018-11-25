import requests

info = {"amount" : 5,
        "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999" }
        }

r = requests.post("https://5000-dot-4934063-dot-devshell.appspot.com/", json=info)
print(r)
print(r.text)

data = r.text



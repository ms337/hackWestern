import requests

info = {"amount" : 5,
        "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999" }
        }

r = requests.post("https://8080-dot-4934063-dot-devshell.appspot.com/add_money_to_dolphin", data=info)
print(r)
#print(r.text)



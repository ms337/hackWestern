import requests
res = requests.post('http://127.0.0.1:8080/', json={"mytext":"lalala"})
if res.ok:
    print(res.json())

import requests
import json

ENPOINT = "https://d1hyv7xw6uagpv.cloudfront.net/api/estates"
CORRECT_RESPONSE = "all/correct_response.json"


def test_can_get_all_result():
    response = requests.get(ENPOINT)
    file = open(CORRECT_RESPONSE, "r")
    assert json.load(file) == response.json()
    assert response.status_code == 200
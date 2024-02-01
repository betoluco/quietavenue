import requests
import json

BASE_URL = "https://d3cggm3jrv835x.cloudfront.net"
ENPOINT = BASE_URL + "/api/estates"
CORRECT_RESPONSE = "all/correct_response.json"


def test_can_get_all_result():
    response = requests.get(ENPOINT)
    file = open(CORRECT_RESPONSE, "r")
    assert json.load(file) == response.json()
    assert response.status_code == 200
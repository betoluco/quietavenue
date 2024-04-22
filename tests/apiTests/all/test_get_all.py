import requests
import json
import pytest

BASE_URL = "https://d3d6un1tjol792.cloudfront.net/"
ENPOINT = BASE_URL + "/api/estates"
CORRECT_RESPONSE = "all/correct_response.json"

def test_no_CORS_header_is_present():
    response = requests.get(ENPOINT)
    with pytest.raises(KeyError) as key_error:
        response.headers['access-control-allow-origin']
    assert key_error.value.args[0] == 'access-control-allow-origin'

def test_can_get_all_result():
    response = requests.get(ENPOINT)
    file = open(CORRECT_RESPONSE, "r")
    assert json.load(file) == response.json()
    assert response.status_code == 200
    

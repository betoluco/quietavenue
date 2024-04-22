import requests
import json
import pytest

BASE_URL = "https://d3d6un1tjol792.cloudfront.net/"
ENPOINT = BASE_URL + "/api/estates"

def test_no_CORS_header_is_present():
    response = requests.get(ENPOINT)
    with pytest.raises(KeyError) as key_error:
        response.headers['access-control-allow-origin']
    assert key_error.value.args[0] == 'access-control-allow-origin'
    assert response.status_code == 200


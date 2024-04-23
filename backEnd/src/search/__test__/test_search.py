import requests
import json
import pytest

BASE_URL = "https://d3d6un1tjol792.cloudfront.net/"
CITY_SEARCH = BASE_URL + "/api/search?filter=fos"
ZIPCODE_SEARCH = BASE_URL + "/api/search?filter=944"
ADDRESS_SEARCH = BASE_URL + "/api/search?filter=hel"


def test_no_CORS_header_is_present():
    response = requests.get(BASE_URL + "/api/search?filter=fos")
    with pytest.raises(KeyError) as key_error:
        response.headers['access-control-allow-origin']
    assert key_error.value.args[0] == 'access-control-allow-origin'
    assert response.status_code == 200
    
def test_length_of_the_query_parameter_has_to_be_greater_or_equal_to_three():
    response = requests.get(BASE_URL + "/api/search?filter=1")
    response_data = response.json()
    assert response_data == None
    assert response.status_code == 200
    response = requests.get(BASE_URL + "/api/search?filter=12")
    response_data = response.json()
    assert response_data == None
    assert response.status_code == 200
    
def test_if_no_match_returns_an_empty_arrays():
    response = requests.get(BASE_URL + "/api/search?filter=empty")
    response_data = response.json()
    assert len(response_data["cities"]) == 0
    assert len(response_data["zip_codes"]) == 0
    assert len(response_data["addresses"]) == 0
    
def test_city_search():
    response = requests.get(BASE_URL + "/api/search?filter=fos")
    response_data = response.json()
    assert response_data["cities"][0]["name"] == "Foster City, CA" 
    assert response_data["cities"][0]["url"] == "/city/1/CA/Foster-City"
    assert response.status_code == 200
    
def test_zipCode_search():
    response = requests.get(BASE_URL + "/api/search?filter=940")
    response_data = response.json()
    assert response_data["zip_codes"][0]["name"] == "94044"
    assert response_data["zip_codes"][0]["url"] == "/zipCode/1/94044"
    assert response.status_code == 200
    
def test_estate_search():
    response = requests.get(BASE_URL + "/api/search?filter=hel")
    response_data = response.json()
    assert response_data["addresses"][0]["name"] == "1020 Helm Ln Foster City CA 94044"
    assert response_data["addresses"][0]["url"] == "/estate/1/CA/-Foster-City/1020-Helm-Ln"
    assert response.status_code == 200
    
def test_search_multiple_results():
    response = requests.get(BASE_URL + "/api/search?filter=100")
    response_data = response.json()
    assert response_data["addresses"][0]["name"] == "1001 Nursery Rd Irving TX 75061"
    assert response_data["addresses"][0]["url"] == "/estate/6/TX/-Irving/1001-Nursery-Rd"
    assert response_data["zip_codes"][0]["name"] == "10010"
    assert response_data["zip_codes"][0]["url"] == "/zipCode/4/10010"
    assert response_data["cities"][0]["name"] == "100 Pines, TX" 
    assert response_data["cities"][0]["url"] == "/city/4/TX/100-Pines"
    
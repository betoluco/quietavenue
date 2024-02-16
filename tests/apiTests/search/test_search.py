import requests
import json

BASE_URL = "https://d3cggm3jrv835x.cloudfront.net"
CITY_SEARCH = BASE_URL + "/api/search?filter=fos"
ZIPCODE_SEARCH = BASE_URL + "/api/search?filter=944"
ADDRESS_SEARCH = BASE_URL + "/api/search?filter=hel"


def test_city_search():
    response = requests.get(CITY_SEARCH)
    response_data = response.json()
    assert response_data["cities"][0]["name"] == "Foster City" 
    assert response_data["cities"][0]["url"] == "/city/CA/Foster-City/1"
    assert response_data["cities"][0]["key"] == 1
    assert response.status_code == 200
    
def test_zipCode_search():
    response = requests.get(ZIPCODE_SEARCH)
    response_data = response.json()
    assert response_data["zip_codes"][0]["name"] == "94404"
    assert response_data["zip_codes"][0]["url"] == "/zipCode/94404/1"
    assert response_data["zip_codes"][0]["key"] == 1
    assert response.status_code == 200
    
def test_estate_search():
    response = requests.get(ADDRESS_SEARCH)
    response_data = response.json()
    assert response_data["addresses"][0]["name"] == "1020 Helm Ln Foster City CA 94404"
    assert response_data["addresses"][0]["url"] == "/estate/CA/Foster-City/-1020-Helm-Ln/1"
    assert response_data["addresses"][0]["key"] == 1
    assert response.status_code == 200
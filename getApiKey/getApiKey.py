import os

import boto3
import cfnresponse
from botocore.exceptions import ClientError

session = boto3.Session()
apigw = session.client('apigateway')


def lambda_handler(event, context):
    request_type = event['RequestType']
    request_type_allowed = ["Update", "Create"]
    from pprint import pprint
    responseData = {}

    print("Cloudformation Operation ==> ", request_type)

    if request_type in request_type_allowed:
        try:
            api_key = apigw.get_api_key(apiKey=os.getenv("API_KEY"), includeValue=True)
            responseData = {'Value': api_key['value']}
            cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData)
        except ClientError as err:
            responseData = {"Error": "{}".format(err)}
            cfnresponse.send(event, context, cfnresponse.FAILED, responseData)
    else:
        cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData)

# Logistic Regression
from flask import Flask, jsonify, request, make_response, Response
from flask_cors import CORS
from flask import Flask
from flask import Response
import json
from sklearn import datasets
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn.cross_validation import train_test_split
from collections import Counter
import numpy as np
import random
from pymongo import MongoClient
from bson import BSON
from bson import json_util
import rapidjson
from json import dumps

app = Flask(__name__)

@app.route('/getData',methods=['GET'])
def hello_world():
    # load the iris datasets
    dataset = datasets.load_test_case()

    X = dataset.data
    y = dataset.target
    # fit a logistic regression model to the data

    response = []
    coordinates = []
    model = LogisticRegression()
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
    predicted = model.fit(X_train, y_train).predict(X_test)

    i=1
    print X_test

    for x in X_test:
        print i
        for y in x:
            print y
            response.append({"id" : int(y)})
            break
    print json.dumps(response)
    resp = Response(json.dumps(response))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    # make predictions
    return resp

if __name__ == '__main__':
    app.run()

# Logistic Regression
from sklearn import datasets
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn.cross_validation import train_test_split
from collections import Counter
import numpy as np

# load the iris datasets
dataset = datasets.load_test_case()

X = dataset.data
y = dataset.target
# fit a logistic regression model to the data

model = LogisticRegression()
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
predicted = model.fit(X_train, y_train).predict(X_test)
print(X_test, predicted)
# make predictions
print(metrics.classification_report(y_test, predicted))
print(metrics.confusion_matrix(y_test, predicted))



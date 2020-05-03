import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

app = flask.Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

lookup_table = {
"age":{
"80+" : .148,
"70-79": .08,
"60-69": .036,
"50-59": .013,
"40-49": .04,
"30-39": .02,
"20-29": .02,
"10-19": .02
},
"sex":{
"male": .028,
"female": .017
},
"condition":{
"none": .03,
"cardiovascular": .0105,
"diabetes": .073,
"chronic_resp": .063,
"hypertension": .06,
"cancer": .056
}
}



def get_digit(number, n):
    return number // 10**n % 10

@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Calculator API</h1>
<p>Calculator API</p>'''


@app.route('/user_info')
@cross_origin()
def api_all():
    new_counties = pd.read_csv('./new_counties.csv')
    query_parameters = request.args

    age = int(query_parameters.get('age'))
    sex = query_parameters.get('sex')
    condition = query_parameters.get('condition')
    county_state = query_parameters.get('county')
    county_state = 'Autauga, Alabama'

    ages = list(lookup_table["age"].keys())
    age_range = ages[len(ages) - get_digit(age, 1)]

    split = county_state.index(',')
    county = county_state[0:split]
    state = county_state[(split + 2) : (len(county_state))]

    age_percentage = lookup_table["age"][age_range]
    sex_percentage = lookup_table["sex"][sex]
    condition_percentage = lookup_table["condition"][condition]


    new_counties = new_counties[new_counties["county"] == county]
    #new_counties = new_counties[new_counties["state"] == state]

    county_percentage = new_counties['mortality_rate'][0]

    #overall rate
    overall_rate = .03
    risk_age = age_percentage / overall_rate
    risk_sex = sex_percentage / overall_rate
    risk_condition = condition_percentage / overall_rate


    predicted = overall_rate * risk_age * risk_sex * risk_condition

    adjusted_pred = predicted * (county_percentage / overall_rate)


    return  jsonify(adjusted_pred)

app.run()

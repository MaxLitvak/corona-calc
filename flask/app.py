import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

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
"cardiovascular": .0105,
"diabetes": .073,
"chronic_resp": .063,
"hypertension": .06,
"cancer": .056
}

counties = pd.read_csv('./us-counties.csv')

counties['mortality_rate'] = counties['deaths'] / counties['cases']

new_counties = counties[counties['date'] == '2020-05-02']

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Calculator API</h1>
<p>Calculator API</p>'''


@app.route('/user_info', methods=['GET'])
def api_all():

    query_parameters = request.args

    age_range = query_parameters.get('age_range')
    sex = query_parameters.get('sex')
    condition = query_parameters.get('condition')
    county = query_parameters.get('county')


    age_percentage = lookup_table["age"][age_range]
    sex_percentage = lookup_table["sex"][sex]
    condition_percentage = lookup_table["condition"][condition]
    county_percentage = new_counties['mortality_rate'][county]

    #overall rate
    overall_rate = .03
    risk_age = age_percentage / overall_rate
    risk_sex = sex_percentage / overall_rate
    risk_condition = condition_percentage / overall_rate


    predicted = overall_rate * risk_age * risk_sex * risk_condition

    adjusted_pred = predicted * (county_percentage / overall)

    return  jsonify(adjusted_pred)

app.run()

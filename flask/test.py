
def get_digit(number, n):
    return number // 10**n % 10

if __name__ == '__main__':
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
    }

    ages = list(lookup_table["age"].keys())


    print(ages[len(ages) - get_digit(64, 1)])

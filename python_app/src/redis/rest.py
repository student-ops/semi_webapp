import redis
import os
import pickle
from pprint import pprint

def SetRedis():
    if(os.getenv('IS_DOCKER').lower() == 'true'):
        r = redis.Redis(host='redis', port=6379, db=0)
    else:
        r = redis.Redis(host='localhost', port=6379, db=0)
    return r


def SelectChat(id):
    r = SetRedis()
    pickled_response = r.get(id)
    response = pickle.loads(pickled_response)
    return response


if __name__ == "__main__":
    query ="どのような人材を目指していますか 日本語で回答して"
    id = "8da4d957-d9e4-48f1-a2ff-ad717314f43a"
    response = SelectChat(id)
    pprint(response)
 
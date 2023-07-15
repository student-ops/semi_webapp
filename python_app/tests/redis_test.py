import os
import uuid
import pickle
import redis
from pprint import pprint 
from src.llama import utils, chat
from llama_index import (
    GPTVectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
    LLMPredictor,
    ServiceContext,
)


# connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

def LlamaChat(bot_name, question):
    model_name = "text-davinci-003"
    model_temperature = 0
    api_key = os.getenv("OPENAI_API_KEY")

    print("Before calling InitIndex")
    index = chat.InitIndex(bot_name=bot_name)
    print("After calling InitIndex")

    print(index)
    llm = utils.get_llm(model_name, model_temperature, api_key)
    service_context = ServiceContext.from_defaults(
        llm_predictor=LLMPredictor(llm=llm))
    if (index == None):
        yield f"BOT not found eorror"
        return

    query_engine = index.as_query_engine(
        streaming=True,
        similarity_top_k=2,
        service_context=service_context
    )
    response = query_engine.query(question) 

    # Save response (without generator) to Redis
    response_copy = dict(response.__dict__)  # Create a copy of response's dictionary representation
    response_copy.pop('response_gen', None)  # Remove the generator
    key = f"{uuid.uuid4()}"
    print(key)
    r.set(key, pickle.dumps(response_copy))  # Save the dictionary to Redis

    for text in response.response_gen:
        yield text

if __name__ == "__main__":
    question = "どのような人材を目指していますか"
    question += " 日本語で回答して"
    bot_name = "faculty"
    try:
        response_gen = LlamaChat(bot_name, question)
        full_text = ""
        for text in response_gen:
            print(text, end="", flush=True)
            full_text += text

        key = f"full_text:{uuid.uuid4()}"
        print("key = ", key)
        r.set(key, pickle.dumps(full_text))

    except Exception as e:
        print("An error occurred: ", str(e))

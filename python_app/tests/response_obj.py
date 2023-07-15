import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from llama_index import (
    GPTVectorStoreIndex,
    LLMPredictor,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
)
from src.llama import utils
from pprint import pprint 
from src.llama import chat
def LlamaChat(bot_name, question):
    model_name = "text-davinci-003"
    model_temperature = 0

    api_key = os.getenv("OPENAI_API_KEY")

    index = chat.InitIndex(bot_name=bot_name)

    print(index)
    llm = utils.get_llm(model_name, model_temperature, api_key)
    service_context = ServiceContext.from_defaults(
        llm_predictor=LLMPredictor(llm=llm))
    if (index == None):
        yield f"BOT not found eorror"
        return

    query_engine = index.as_query_engine(
        streaming=None,
        similarity_top_k=2,
        service_context=service_context
    )
    response = query_engine.query(question)
    print("####################")
    pprint(response)
    return response
if __name__ == "__main__":
    question = "どのような人材を目指していますか"
    question += " 日本語で回答して"
    bot_name = "faculty"
    try:

        response_gen = LlamaChat(bot_name, question)
        response = next(response_gen)
        pprint(response)
    except Exception as e:
        print("An error occurred: ", str(e))
    # InitIndex("faculty")

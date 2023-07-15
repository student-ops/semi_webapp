from llama_index import VectorStoreIndex
from llama_index.evaluation import QueryResponseEvaluator

import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from llama_index.evaluation import ResponseEvaluator
from llama_index import (
    LLMPredictor,
    ServiceContext,
)
from src.llama import chat
from pprint import pprint
from src.redis import rest
# build service context
apikey = os.environ["OPENAI_API_KEY"]
llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003",streaming=True))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
evaluator = QueryResponseEvaluator(service_context=service_context)

# build index

# index = chat.InitIndex("faculty")
# # query index
query ="どのような人材を目指していますか 日本語で回答して"
# query_engine = index.as_query_engine(
#     streaming=True,
#     similarity_top_k=2,
#     service_context=service_context
# )
# response = query_engine.query(query)
# pprint(response)
# response_text = ""
# for text in response.response_gen:
#     print(text)
#     response_text +=text


# r = response.get_response()
# r.response = response_text
id = "8da4d957-d9e4-48f1-a2ff-ad717314f43a"
redis_res =  rest.SelectChat(id)

# pprint(redis_res.source_nodes[0].node.text)
eval_result = evaluator.evaluate_source_nodes(response=redis_res)
print(eval_result)

# texts = [node_with_score.node.text for node_with_score in redis_res.source_nodes]
# print(texts)

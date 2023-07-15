from flask import Flask, Response, request, jsonify
from src.llama import chat
from flask_cors import CORS
from flask import stream_with_context
import uuid
from src.llama import evaluate
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/llama_chat', methods=['POST'])
def llama_chat_route():
    data = request.json
    question = data['question']
    request_uuid = f"{uuid.uuid4()}"
    def generate():
        buffer = ""
        buffer_size = 0
        yield(f"id:{request_uuid}\n\n")
        for response_text in chat.LlamaChat(bot_name=data['bot_name'], question=question,uuid = request_uuid):
            buffer += response_text
            buffer_size += len(response_text.encode('utf-8'))  # Get the byte size of the response_text in UTF-8

            if buffer_size >= 8:  # Send the buffer when its size reaches 20 bytes (5 characters in UTF-8)
                yield f"{buffer}"
                buffer = ""
                buffer_size = 0

        # Send any remaining data in the buffer
        if buffer:
            yield f"{buffer}"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')


@app.route('/llama_evaluate',methods =['POST'])
def llama_evaluate():
    data= request.json
    eval_result = evaluate.query_evaluation(data['id'],data['query'])
    print(eval_result)
    response_data = {
        "eval_result":eval_result
    }
    return json.dumps(response_data, ensure_ascii=False).encode('utf-8'), 200


@app.route('/chat_source_nodes',methods =['POST'])
def chat_source_nodes():
    data = request.json
    source_nodes = evaluate.fetch_source_nodes(data['id'])
    response_data = {
        "source_nodes":source_nodes
    }
    return json.dumps(response_data, ensure_ascii=False).encode('utf-8'), 200
    # return jsonify(response_data)

    

@app.route('/ping')
def ping(): return Response('Pong', mimetype='text/plain')


if __name__ == '__main__':
    print("starting on port 4000")
    app.run(host='0.0.0.0', port=4000)

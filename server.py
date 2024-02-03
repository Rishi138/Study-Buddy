from flask import Flask, jsonify, request
from openai import OpenAI

app = Flask(__name__)

messages = []
client = OpenAI()

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Python!'})

@app.route('/init', methods=['GET'])
def init():
    global messages
    global client
    article = request.args.get('article')
    client = OpenAI()
    messages = [
        {"role": "system",
         "content": "You are a study assistant, proficient in summarizing complex articles concisely. Prioritize "
                    "basing responses on the provided articles rather than personal knowledge. If uncertain about an "
                    "answer, indicate that to the user. All of your replies should be short and concise.  Ensure that "
                    "your replies to the user aren't overwhelming and lengthy. Try to keep your responses at 75 words only. Here is the "
                    "article you will be using today {}".format(
             article)}
    ]
    return jsonify({'message': 'init successful'})

@app.route('/reply', methods=['GET'])
def reply():
    question = request.args.get('question')
    messages.append({"role": "user", "content": question})

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=messages
    )

    response_content = completion.choices[0].message.content
    messages.append({"role": "assistant", "content": response_content})
    response_content = response_content.replace("/n", "<br>")
    print(response_content)
    return jsonify({'response': response_content})


app.run(debug=True)

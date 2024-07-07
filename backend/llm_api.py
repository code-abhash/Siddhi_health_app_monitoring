from flask import Flask, request, jsonify
import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_id = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_id)
tokenizer = GPT2Tokenizer.from_pretrained(model_id)


def generate_analysis(dataframe):
    trends = []
    anomalies = []

    
    for column in dataframe.columns:
        values = dataframe[column].tolist()

        #trend
        if all(values[i] == values[0] for i in range(len(values))):
            trend = "Stable (constant value)"
        else:
            if all(values[i] < values[i+1] for i in range(len(values)-1)):
                trend = "Increasing trend"
            elif all(values[i] > values[i+1] for i in range(len(values)-1)):
                trend = "Decreasing trend"
            else:
                trend = "Fluctuating trend"

        # Format trend line without asterisk
        trends.append(f"{column}: {trend} ({', '.join(map(str, values))})")

        # Identify anomalies
        for i in range(len(values)-1):
            if abs(values[i+1] - values[i]) >= 10:
                anomalies.append(f"{column}: Unusual change from {values[i]} to {values[i+1]} (time instance {i+2})")

    # Generate the analysis text
    analysis_text = f"Based on the provided dataframe, here is the analysis:\n\nTrends:**\n\n"
    analysis_text += "\n".join(trends)
    analysis_text += "\n\nAnomalies:\n\n"
    analysis_text += "\n".join(anomalies)

    return analysis_text

# API route to get the analysis result
@app.route('/api/v1/analysis', methods=['POST'])
def get_analysis():
    try:
        data = request.json 
        dataframe = pd.DataFrame(data)  
        analysis_result = generate_analysis(dataframe)
        return jsonify({"analysis_result": analysis_result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/')
def index():
    return "Hello, visit /api/v1/analysis to post the analysis result."


if __name__ == '__main__':
    app.run(debug=True, port=8001)

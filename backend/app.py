from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load machine learning models and scalers
model_asthma = tf.keras.models.load_model(r'model_asthama.h5')
model_diarrhea = tf.keras.models.load_model(r'model_diarrhea.h5')
model_pneumonia = tf.keras.models.load_model(r'model_pnuemonia.h5')
model_fever = tf.keras.models.load_model(r'model_fever.h5')
model_cough = tf.keras.models.load_model(r'model_cough.h5')

scalar= joblib.load(r'scalar_function_asthama.pkl')
scalar_diarrhea = joblib.load(r'scalar_function_diarrhea.pkl')
scalar_pneumonia = joblib.load(r'scalar_function_pnuemonia.pkl')
scalar_fever = joblib.load(r'scalar_function_fever.pkl')
scalar_cough = joblib.load(r'scalar_function_cough.pkl')

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  

@app.route('/predict', methods=['POST'])
def predict():
    # Receive data from the request
    try:
        data = request.get_json()
        temperature = float(data['bodyTemp'])
        resprate = float(data['respRate'])
        heartrate = float(data['heartRate'])
        o2sat = float(data['spo2Value'])
        sbp = float(data['systolicBP'])
        dbp = float(data['diastolicBP'])
        features=[temperature,resprate,heartrate,o2sat,sbp,dbp]
        final_features = np.array([features])
    # Perform scaling
        scaled_test_asthma= scalar.transform(final_features)
        scaled_test_diarrhea=scalar_diarrhea.transform(final_features)
        scaled_test_pnuemonia=scalar_pneumonia.transform(final_features)
        scaled_test_fever=scalar_fever.transform(final_features)
        scaled_test_cough=scalar_cough.transform(final_features)


        prediction_asthma =model_asthma.predict(scaled_test_asthma)       
        prediction_diarrhea= model_diarrhea.predict(scaled_test_diarrhea)
        prediction_pnuemonia= model_pneumonia.predict(scaled_test_pnuemonia)
        prediction_fever= model_fever.predict(scaled_test_fever)
        prediction_cough= model_cough.predict(scaled_test_cough)
    # Make predictions
        pred_asthma = prediction_asthma[0][0]
        pred_diarrhea =  prediction_diarrhea[0][0]
        pred_pneumonia = prediction_pnuemonia[0][0]
        pred_fever =prediction_fever[0][0]
        pred_cough = prediction_cough[0][0]

    # Prepare response
        response = {
            'Asthma likelihood': float(pred_asthma),
            'Diarrhea likelihood': float(pred_diarrhea),
            'Pneumonia likelihood': float(pred_pneumonia),
            'Fever likelihood': float(pred_fever),
            'Cough likelihood': float(pred_cough)
             }

        return jsonify(response)
    except Exception as e:
     return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)




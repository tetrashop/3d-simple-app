from flask import Flask, send_from_directory, jsonify, request
import os

app = Flask(__name__)

# مسیریابی پویا با تنظیم MIME type
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    if not os.path.exists(path):
        return jsonify({"error": "not found"}), 404
    # تنظیم MIME type برای فایل‌های jsx
    if path.endswith('.jsx'):
        return send_from_directory('.', path, mimetype='text/javascript')
    return send_from_directory('.', path)

# API (همان قبل)
current_config = {"color": "#ff6600", "speed": 0.008}

@app.route('/api/config', methods=['GET'])
def get_config():
    return jsonify(current_config)

@app.route('/api/config', methods=['POST'])
def set_config():
    data = request.json
    if 'color' in data:
        current_config['color'] = data['color']
    if 'speed' in data:
        current_config['speed'] = float(data['speed'])
    return jsonify(current_config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

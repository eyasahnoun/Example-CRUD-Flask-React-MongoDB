from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
client = MongoClient('mongodb://host.docker.internal:27017/')
db = client['app1']
collection = db['prod']

@app.route('/items', methods=['GET'])
def get_items():
    items = list(collection.find())
    items = [{**item, '_id': str(item['_id'])} for item in items]
    return jsonify(items)

@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({'message': 'Item added successfully'})

@app.route('/items/<item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    collection.update_one({'_id': ObjectId(item_id)}, {'$set': data})
    return jsonify({'message': 'Item updated successfully'})

@app.route('/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    collection.delete_one({'_id': ObjectId(item_id)})
    return jsonify({'message': 'Item deleted successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0')


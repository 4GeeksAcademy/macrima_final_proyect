"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Fan
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/fans', methods=[ 'GET'])
def get_fans():
    all_fans = Fan.query.all()
    results = list(map(lambda fan: fan.serialize(),all_fans))
    response_body = {
        "msg": "Hello, this is your GET /fan response ",
        "fans": results
    }

    return jsonify(response_body), 200

@api.route('/fan', methods=['POST'])
def add_fan():
    body= request.get_json()
    
    fan = Fan(username =body["username"], email=body["email"],
                           password = body["password"], description =body["description"], avatar =body["avatar"], is_active = True)
    db.session.add(fan)
    db.session.commit()
    response_body = {
        "msg": "Fan created"
    }
    return jsonify(response_body),200
@api.route('/fan/<int:fan_id>', methods=['PUT'])
def update_fan(fan_id):
    fan = Fan.query.get(fan_id)
    if not fan:
        return jsonify({"error": "fan not found"}), 404
    
    data = request.json
    if 'username' in data:
        fan.username = data['username']
    if 'email' in data:
        fan.email = data['email']
    if 'password' in data:
        fan.password = data['password']
    if 'description' in data:
        fan.description = data['description']
    if 'avatar' in data:
        fan.avatar = data['avatar']
    
    db.session.commit()
    return jsonify({"message": "Fan updated successfully", "fan": {"id": fan.id, "username": fan.username, 
                                                                    "email": fan.email,
                                                                    "avatar": fan.avatar,
                                                                     "description": fan.description}})
@api.route('/fan/<int:fan_id>', methods=['DELETE'])
def delete_fan(fan_id):
    fan = Fan.query.get(fan_id)
    if not fan:
        return jsonify({"error": "fan no encontrado"}), 404
    db.session.delete(fan)
    db.session.commit()

    response_body ={
        "msg": "Fan Deleted"
    }
    return response_body, 200
@api.route('/fan/<int:fan_id>', methods=['GET'])
def get_fan_by_id(fan_id):
    fan = Fan.query.get(fan_id)  
    
    if fan is None:
        return jsonify({"error": "Fan not found"}),
    
    return jsonify(fan.serialize())

    



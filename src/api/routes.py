"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Fan,Artista, Tags
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

@api.route('/artistas/add', methods=['POST'])
def create_artista():
    body = request.get_json()
    new_artista = Artista(
        email=body['email'],
        password=body['password'], 
        username=body['username'],
        avatar=body.get('avatar', None) 
    )
    db.session.add(new_artista)
    db.session.commit()
    return jsonify({"message": "Artista creado exitosamente"}), 201

@api.route('/artistas', methods=['GET'])
def get_artistas():
    artistas = Artista.query.all()
    return jsonify([{
        "id": artista.id,
        "email": artista.email,
        "username": artista.username,
        "avatar": artista.avatar
    } for artista in artistas]), 200

@api.route('/artistas/delete/<int:artista_id>', methods=['DELETE'])
def delete_artista(artista_id):
    artista = Artista.query.get(artista_id)
    if not artista:
        return jsonify({"error": "Artista no encontrado"}), 404
    db.session.delete(artista)
    db.session.commit()
    return jsonify({"message": f"Artista con id {artista_id} eliminado exitosamente"}), 200

@api.route('/artista/<int:artista_id>', methods=['GET'])
def get_artista_by_id(artista_id):
    artista = Artista.query.get(artista_id)  
    
    if artista is None:
        return jsonify({"error": "artista not found"}), 404
    
    return jsonify(artista.serialize())

@api.route('/artistas/<int:artistas_id>', methods=['PUT'])
def update_artista(artistas_id):
    artistas = Artista.query.get(artistas_id)
    if not artistas:
        return jsonify({"error": "artista not found"}), 404
    data = request.json
    if 'username' in data:
        artistas.username = data['username']
    if 'email' in data:
        artistas.email = data['email']
    if 'password' in data:
        artistas.password = data['password']
    if 'avatar' in data:
        artistas.avatar = data['avatar']
    db.session.commit()
    return jsonify({"message": "artista updated successfully", "artista": 
        {
        "id": artistas.id,
        "email": artistas.email,
        "username": artistas.username,
        "avatar": artistas.avatar
    }}), 200 

@api.route('/fans', methods=[ 'GET'])
def get_fans():
    all_fans = Fan.query.all()
    results = list(map(lambda fan: fan.serialize(),all_fans))
    response_body = {
        "msg": "Hello, this is your GET /fan response ",
        "fans": results
    }

    return jsonify(response_body), 200

@api.route('/tags', methods=['GET'])
def get_tags():
    all_tags= Tags.query.all()
    result= list(map(lambda tag: tag.serialize(),all_tags))
    response_body = {
        "msg": "Estoy trayendo los tags",
        "tags": result
    }

    return jsonify(response_body), 200


@api.route('/tags/new', methods=['POST'])
def add_new_tag():
    body = request.get_json()
    new_tag = Tags(name= body["name"])
    db.session.add(new_tag)
    db.session.commit()
    response_body = {
         "msg": "Voy a crear un nuevo tag "
     }

    return jsonify(response_body), 200


@api.route('/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    tag_exist = Tags.query.get(tag_id)
    if not tag_exist:
        return jsonify({"error": "Tag no encontrado"}), 404
    
    db.session.delete(tag_exist)
    db.session.commit()
    
    return jsonify({"msg": "Tag eliminado de la base de datos"}), 200


@api.route('/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    tag = Tags.query.get(tag_id)
    if not tag:
        return jsonify({"error": "tag not found"}), 404
    data = request.json
    if 'name' in data:
        tag.name = data['name']
    db.session.commit()
    return jsonify({"message": "Tag updated successfully", "tag": {"id": tag.id, "name": tag.name}})  


@api.route('/tags/<int:tag_id>', methods=['GET'])
def get_tag_by_id(tag_id):
    tag = Tags.query.get(tag_id)  
    
    if tag is None:
        return jsonify({"error": "Tag not found"}),
    
    return jsonify(tag.serialize())

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

    



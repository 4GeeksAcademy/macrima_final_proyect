"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tags
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

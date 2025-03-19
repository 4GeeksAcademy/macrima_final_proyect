"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Artista
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
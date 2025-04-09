"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Fan,Artista, Tags,Wallpaper, TagsWallpaper, Seguidores,Favoritos, Coments,MeGusta
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json


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
@api.route('/wallpaper/new', methods=['POST'])
def new_wallpaper():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No se enviaron datos"}), 400
    new_wallpaper = Wallpaper(
        imagen=body['imagen'],
        fecha=body['fecha'], 
        nombre=body['nombre'],
        artista_id = body['artista_id']
    )
    db.session.add(new_wallpaper)
    db.session.commit()
    return jsonify({"message": "wallpaper creado exitosamente"}), 201



@api.route('/followers', methods=['GET'])
def get_followers():
    all_followers= Seguidores.query.all()
    result= list(map(lambda tag: tag.serialize(),all_followers))
    # result= list(map(lambda tag: tag.serialize_follower_artist(),all_followers))
    response_body = {
        "msg": "Estoy trayendo los followers",
        "followers": result
    }

    return jsonify(response_body), 200

@api.route('/followers/<int:follower_id>', methods=['GET'])
def get_follower_by_id(follower_id):
    follower = Seguidores.query.get(follower_id)  
    
    if follower is None:
        return jsonify({"error": "Follower not found"}),
    
    return jsonify(follower.serialize()), 200


@api.route('/wallpapers', methods=['GET'])
def get_wallpapers():
    wallpapers = Wallpaper.query.all()
    return jsonify([wp.serialize() for wp in wallpapers]), 200


@api.route('/wallpaper/<int:wallpaper_id>', methods=['DELETE'])
def delete_wallpaper(wallpaper_id):
    wallpaper = Wallpaper.query.get(wallpaper_id)
    if not wallpaper:
        return jsonify({"error": "wallpaper no encontrado"}), 404
    db.session.delete(wallpaper)
    db.session.commit()
    return jsonify({"message": f"wallpaper con id {wallpaper_id} eliminado exitosamente"}), 200

@api.route('/wallpaper/<int:wallpaper_id>', methods=['GET'])
def get_wallpaper_by_id(wallpaper_id):
    wallpaper = Wallpaper.query.get(wallpaper_id)  
    
    if wallpaper is None:
        return jsonify({"error": "wallpaper not found"}), 404
    
    return jsonify(wallpaper.serialize())

@api.route('/follower/new', methods=['POST'])
def add_follower():
    data= request.get_json()
    follower = Seguidores(fan_id=data["fan_id"], 
                        artista_id=data["artista_id"])
    db.session.add(follower)
    db.session.commit()
    response_body = {
        "msg": "Follower created"
    }
    return jsonify(response_body),200

@api.route('/followers/fan/<int:fan_id>/artist/<int:artist_id>', methods=['DELETE'])
def delete_follower_by_id(fan_id, artist_id):
    follower = Seguidores.query.filter_by(fan_id = fan_id, artista_id = artist_id).first()  
    
    if follower is None:
        return jsonify({"error": "Follower not found"}), 404
    db.session.delete(follower)
    db.session.commit()
    return jsonify({'msg': 'Follower deleted'}), 200


@api.route('/wallpaper/edit/<int:wallpapers_id>', methods=['PUT'])
def update_wallpaper(wallpapers_id):
    wallpapers = Wallpaper.query.get(wallpapers_id)
    if not wallpapers:
        return jsonify({"error": "wallpaper not found"}), 404
    data = request.json
    if 'imagen' in data:
        wallpapers.imagen = data['imagen']
    if 'fecha' in data:
        wallpapers.fecha = data['fecha']
    if 'nombre' in data:
        wallpapers.nombre = data['nombre']
    if 'artista_id' in data:
        wallpapers.artista_id = data['artista_id']
    db.session.commit()
    return jsonify({"message": "wallpaper updated successfully", "wallpaper": 
        {
        "id": wallpapers.id,
        "imagen": wallpapers.imagen,
        "fecha": wallpapers.fecha,
        "nombre": wallpapers.nombre,
        "artista_id": wallpapers.artista_id
    }}), 200 

@api.route('/wallpapertag', methods=['POST'])
def create_tags_wallpaper():
    data = request.get_json()
    nuevo_registro = TagsWallpaper(
        id_tag=data['id_tag'],
        id_wallpaper=data['id_wallpaper']
    )
    db.session.add(nuevo_registro)
    db.session.commit()
    return jsonify({"message": "Registro creado exitosamente", "registro": nuevo_registro.serialize()}), 200

@api.route('/tags_wallpaper', methods=['GET'])
def get_tags_wallpapers():
    registros = TagsWallpaper.query.all()
    return jsonify([registro.serialize() for registro in registros]), 200



@api.route('/tags_wallpaper/<int:id>', methods=['GET'])
def get_tags_wallpaper(id):
    registro = TagsWallpaper.query.get(id)
    return jsonify(registro.serialize()), 200

@api.route('/tags_wallpaper/<int:id>', methods=['PUT'])
def update_tags_wallpaper(id):
    data = request.get_json()
    registro = TagsWallpaper.query.get(id)
    registro.id_tag = data['id_tag']
    registro.id_wallpaper = data['id_wallpaper']
    db.session.commit()
    return jsonify({"message": "Registro actualizado", "registro": registro.serialize()}), 200

# @api.route('/tags_wallpaper/<int:id>', methods=['DELETE'])
# def delete_tags_wallpaper(id):
#     registro = TagsWallpaper.query.get(id)
#     db.session.delete(registro)
#     db.session.commit()
#     return jsonify({"message": "Registro eliminado"}), 200

@api.route('/tags_wallpaper/tags/<int:id_tag>/wallpaper/<int:id_wallpaper>', methods=['DELETE'])
def delete_tags_wallpaper(id_tag, id_wallpaper):
    registro = TagsWallpaper.query.filter_by(id_tag = id_tag, id_wallpaper = id_wallpaper).first()
    if registro is None:
        return jsonify({"error": "Follower not found"}),
    db.session.delete(registro)
    db.session.commit()
    return jsonify({'msg': 'Follower deleted'}), 200


@api.route('/coments', methods=['GET'])
def get_coments():
    all_coments= Coments.query.all()
    result= list(map(lambda coments: coments.serialize(),all_coments))
    # result= list(map(lambda tag: tag.serialize_follower_artist(),all_followers))
    response_body = {
        "msg": "I'm bringing all the comments on this post.",
        "coments": result
    }

    return jsonify(response_body), 200

@api.route('/coments/<int:coment_id>', methods=['GET'])
def get_coment_by_id(coment_id):
    content = Coments.query.get(coment_id)  
    if content is None:
        return jsonify({"error": "Comment not found"}),
    
    return jsonify(content.serialize()), 200


@api.route('/coment/wallpaper', methods=['POST'])
def create_coment_at_wallpaper():
    data = request.get_json()
    new_coment = Coments(
        fan_id=data['fan_id'],
        wallpaper_id=data['wallpaper_id'],
        content=data['content']
    )
    db.session.add(new_coment)
    db.session.commit()
    return jsonify({"message": "Comment created successfully", "registro": new_coment.serialize()}), 200

@api.route('/coment/<int:id>', methods=['PUT'])
def update_coment_at_wallpaper(id):
    data = request.get_json()
    content = Coments.query.get(id)
    content.fan_id = data['fan_id']
    content.wallpaper_id = data['wallpaper_id']
    content.content = data['content']
    db.session.commit()
    return jsonify({"message": "Comment updated successfully", "content": content.serialize()}), 200

@api.route('/coments/fan/<int:fan_id>/wallpaper/<int:wallpaper_id>', methods=['DELETE'])
def delete_coments_wallpaper(fan_id, wallpaper_id):
    content = Coments.query.filter_by(fan_id = fan_id, wallpaper_id = wallpaper_id).first()
    if content is None:
        return jsonify({"error": "Coment not found"}), 404
    db.session.delete(content)
    db.session.commit()
    return jsonify({'msg': 'Coment deleted'}), 200

    
@api.route('/favorito/new', methods=['POST'])
def new_favorito():
    data = request.get_json()
    favorito = Favoritos(
        id_fan=data['id_fan'],
        id_wallpaper=data['id_wallpaper']
    )
    db.session.add(favorito)
    db.session.commit()
    return jsonify({"message": "favorito creado exitosamente", "registro": favorito.serialize()}), 200

@api.route('/favoritos', methods=['GET'])
def get_favoritos():
    favoritos = Favoritos.query.all()
    return jsonify([favorito.serialize() for favorito in favoritos]), 200

@api.route('/favoritos/<int:id>', methods=['GET'])
def get_single_favoritos(id):
    favorito = Favoritos.query.get(id)
    return jsonify(favorito.serialize()), 200

@api.route('/favoritos/edit/<int:id>', methods=['PUT'])
def update_favorito(id):
    data = request.get_json()
    favorito = Favoritos.query.get(id)
    favorito.id_tag = data['id_fan']
    favorito.id_wallpaper = data['id_wallpaper']
    db.session.commit()
    return jsonify({"message": "favorito actualizado", "favorito": favorito.serialize()}), 200

@api.route('/favoritos/fan/<int:id_fan>/wallpaper/<int:id_wallpaper>', methods=['DELETE'])
def delete_favoritos(id_fan, id_wallpaper):
    favorito = Favoritos.query.filter_by(id_fan = id_fan, id_wallpaper = id_wallpaper).first()
    if favorito is None:
        return jsonify({"error": "favorito not found"}),
    db.session.delete(favorito)
    db.session.commit()
    return jsonify({'msg': 'favorito deleted'}), 200
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@api.route("/fan/login", methods=["POST"])
def login_fan():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "username y contraseña son requeridos"}), 400

    fan = Fan.query.filter_by(username=username).first()
    access_token = create_access_token(identity=json.dumps({"id": fan.id, "role": "fan"}))
    print(access_token)

    return jsonify({
            "access_token": access_token,
            "fan_data": {  
                "id": fan.id,
                "username": fan.username,
                "role": "fan",
                "email": fan.email
            }
        }), 200
@api.route("/fan/dashboard", methods=["GET"])
@jwt_required()
def protected_fan():
    fan_data = get_jwt_identity()
    current_user = json.loads(fan_data)

    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"msg": "Token inválido"}), 401
    
    fan = Fan.query.get(current_user["id"])

    if not fan:
        return jsonify({"message": "fan no encontrado"}), 404

    return jsonify(logged={**fan.serialize(),"role": current_user["role"]}), 200





@api.route('/me_gusta/new', methods=['POST'])
def new_me_gusta():
    data = request.get_json()
    
    me_gusta = MeGusta(
        id_fan=data['id_fan'],
        id_wallpaper=data['id_wallpaper']
    )
    
    db.session.add(me_gusta)
    db.session.commit()
    
    return jsonify({
        "message": " Wallpaper Agregado a Me Gusta ",
        "registro": me_gusta.serialize()
    }), 200

@api.route('/me_gusta', methods=['GET'])
def get_me_gusta():
    me_gusta_list = MeGusta.query.all()
    return jsonify([me_gusta.serialize() for me_gusta in me_gusta_list]), 200

@api.route('/me_gusta/<int:id>', methods=['GET'])
def get_single_me_gusta(id):
    me_gusta = MeGusta.query.get(id)
    return jsonify(me_gusta.serialize()), 200

@api.route('/me_gusta/edit/<int:id>', methods=['PUT'])
def update_me_gusta(id):
    data = request.get_json()
    me_gusta = MeGusta.query.get(id)  
    me_gusta.id_fan = data['id_fan']
    me_gusta.id_wallpaper = data['id_wallpaper']
    db.session.commit()
    return jsonify({
        "message": "¡Me Gusta actualizado exitosamente!",
        "registro": me_gusta.serialize()
    }), 200

@api.route('/me_gusta/fan/<int:id_fan>/wallpaper/<int:id_wallpaper>', methods=['DELETE'])
def delete_me_gusta(id_fan, id_wallpaper):
    me_gusta = MeGusta.query.filter_by(id_fan=id_fan, id_wallpaper=id_wallpaper).first()
    if me_gusta is None:
        return jsonify({"error": "Me Gusta no encontrado"}), 404
    db.session.delete(me_gusta)
    db.session.commit()
    return jsonify({"message": "¡Me Gusta eliminado exitosamente!"}), 200

@api.route("/login-artista", methods=["POST"])
def login_artista():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    artista = Artista.query.filter_by(email=email).first()
    access_token = create_access_token(identity=json.dumps({"id": artista.id, "role": "artista"}))
    print(access_token)

    return jsonify({
            "access_token": access_token,
            "artista_data": {  
                "id": artista.id,
                "username": artista.username,
                "email": artista.email,
                "role": "artista"
            }
        }), 200 

@api.route("/artista-protected", methods=["GET"])
@jwt_required()
def get_artista_protected():
    artista_data = get_jwt_identity()
    current_user = json.loads(artista_data)

    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"msg": "Token inválido"}), 401
    
    artista = Artista.query.get(current_user["id"])

    if not artista:
        return jsonify({"message": "Artista no encontrado"}), 404

    return jsonify(logged={**artista.serialize(),"role": current_user["role"]}), 200

@api.route("/artista-edit", methods=["PUT"])
@jwt_required()
def update_artista_protected():
    artista_data = get_jwt_identity()
    current_user = json.loads(artista_data)

    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"msg": "Token inválido"}), 401
    artista = Artista.query.get(current_user["id"])

    if not artista:
        return jsonify({"message": "Artista no encontrado"}), 404

    
    username = request.json.get("username", artista.username)
    email = request.json.get("email", artista.email)
    password = request.json.get("password", None)  
    avatar = request.json.get("avatar", artista.avatar) 

    try:
        
        artista.username = username
        artista.email = email
        artista.avatar = avatar
        if password:  
            artista.password = password
        db.session.commit()
        return jsonify({"message": "Artista actualizado con éxito", "artista": artista.serialize()}), 200
    except Exception as e:
        print(f"Error al actualizar el artista: {e}")
        return jsonify({"message": "Error al actualizar el artista"}), 500

@api.route('/publicar-wallpaper', methods=['POST'])
@jwt_required()
def publicar_wallpaper():
    artista_data = get_jwt_identity()
    current_user = json.loads(artista_data)

    
    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"error": "Token inválido"}), 401

    body = request.get_json()
    if not body:
        return jsonify({"error": "No se enviaron datos"}), 400

    # Crear el wallpaper
    new_wallpaper = Wallpaper(
        imagen=body['imagen'],
        fecha=body['fecha'], 
        nombre=body['nombre'],
        artista_id=current_user['id']  
    )
    db.session.add(new_wallpaper)
    db.session.commit()
    return jsonify({"message": "wallpaper creado exitosamente"}), 201

@api.route('/get-wallpapers', methods=['GET'])
@jwt_required()
def get_wallpapers_by_user():
    artista_data = get_jwt_identity()
    current_user = json.loads(artista_data)

    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"error": "Token inválido"}), 401

    try:
        
        wallpapers = Wallpaper.query.filter_by(artista_id=current_user["id"]).all()

        if not wallpapers:
            return jsonify({"message": "No se encontraron wallpapers"}), 200

        
        serialized_wallpapers = [wallpaper.serialize() for wallpaper in wallpapers]
        return jsonify(serialized_wallpapers), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Error obteniendo wallpapers"}), 500
    
@api.route('/fan/comentarios', methods=['POST'])
def create_comentario():
    try:
        data = request.get_json()
        content = data.get('content')
        fan_id = data.get('fan_id')
        wallpaper_id = data.get('wallpaper_id')

        if not content or not fan_id or not wallpaper_id:
            return jsonify({"error": "Faltan campos obligatorios: content, fan_id, wallpaper_id"}), 400

        nuevo_comentario = Coments(
            content=content,
            fan_id=fan_id,
            wallpaper_id=wallpaper_id
        )
        db.session.add(nuevo_comentario)
        db.session.commit()

        return jsonify(nuevo_comentario.serialize()), 201

    except Exception as e:
        print(f"Error al crear comentario: {e}")
        return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

@api.route('/wallpaper/<int:wallpaper_id>/comentarios', methods=['GET'])
def get_comentarios(wallpaper_id):
    try:
        comentarios = Coments.query.filter_by(wallpaper_id=wallpaper_id).all()
        return jsonify([coment.serialize() for coment in comentarios]), 200
    except Exception as e:
        print(f"Error al obtener comentarios: {e}")
        return jsonify({"error": "Ocurrió un error al obtener los comentarios"}), 500
@api.route("/fan/feed/comment", methods=["GET"])
@jwt_required()
def feed_fan_comment():
    fan_data = get_jwt_identity()
    current_user = json.loads(fan_data)

    if not isinstance(current_user, dict) or "id" not in current_user:
        return jsonify({"msg": "Token inválido"}), 401
    
    fan = Fan.query.get(current_user["id"])

    if not fan:
        return jsonify({"message": "fan no encontrado"}), 404

    return jsonify(logged={**fan.serialize(),"role": current_user["role"]}), 200




if __name__ == "__main__":
    api.run()
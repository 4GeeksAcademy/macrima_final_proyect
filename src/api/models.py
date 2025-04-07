from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Tags(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    tags_wallpaper = db.relationship('TagsWallpaper', back_populates="tag", lazy=True)
    

    def __repr__(self):
        return f'<Tags {self.id, self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Artista(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False) 
    username = db.Column(db.String(50), unique=True, nullable=False)
    avatar = db.Column(db.String(200), nullable=True)
    artista = db.relationship('Seguidores', back_populates="artista", lazy=True)  
    wallpaper = db.relationship('Wallpaper', back_populates="artista", lazy=True)

    def serialize(self):
        return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "avatar": self.avatar,
    }

class Fan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    seguidores = db.relationship('Seguidores', back_populates="fan", lazy=True)
    coments = db.relationship('Coments', back_populates='fan', lazy=True)
    favoritos = db.relationship('Favoritos', back_populates="fan", lazy=True)
    me_gusta = db.relationship('MeGusta',back_populates="fan", lazy=True)

    def __repr__(self):
        return f'<Fan {self.email}>'

    def serialize(self):
        wallpaper = Wallpaper.query.all()
        wallpaper_serialized = [wallpaper.serialize() for wallpaper in wallpaper]

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "description": self.description,
            "avatar": self.avatar,
            "is_active": self.is_active,
            # "wallpaper": wallpaper_serialized
            # do not serialize the password, its a security breach
        }
    
class Seguidores(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fan_id = db.Column(db.Integer, db.ForeignKey('fan.id'), nullable=False)
    fan = db.relationship('Fan')
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'), nullable=False)
    artista = db.relationship('Artista')

    def __repr__(self):
        return f'<Seguidores {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "fan": self.fan.serialize(),
            "artista": self.artista.serialize(),
            # do not serialize the password, its a security breach
        }
    def serialize_follower_artist(self):
        return self.artista.serialize()
    
class Wallpaper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(120), unique=True, nullable=False)
    fecha = db.Column(db.String(200), nullable=False) 
    nombre = db.Column(db.String(50), unique=True, nullable=False)
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'), nullable=False) 
    artista = db.relationship('Artista')
    tags_wallpaper = db.relationship('TagsWallpaper', back_populates="wallpaper", lazy=True)
    me_gusta = db.relationship('MeGusta',back_populates="wallpaper", lazy=True)
    coments = db.relationship('Coments', back_populates='wallpaper', lazy=True)
    
    
    def __repr__(self):
        return f'<Wallpaper {self.id,self.nombre}>'

    def serialize(self):

        return {
        "id": self.id,
        "imagen": self.imagen,
        "fecha": self.fecha,
        "nombre": self.nombre,
        "artista_id": self.artista_id,
        "artista": self.artista.serialize(),
        
    }

class TagsWallpaper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_tag = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
    id_wallpaper = db.Column(db.Integer, db.ForeignKey('wallpaper.id'), nullable=False)
    tag = db.relationship('Tags')
    wallpaper = db.relationship('Wallpaper')

    def __repr__(self):
        return f'<TagsWallpaper {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "tag": self.tag.serialize(),
            "wallpaper": self.wallpaper.serialize()
        }

class Coments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(120), unique=False, nullable=False)
    fan_id = db.Column(db.Integer, db.ForeignKey('fan.id'), nullable=False)
    wallpaper_id = db.Column(db.Integer, db.ForeignKey('wallpaper.id'), nullable=False)
    fan = db.relationship('Fan', back_populates='coments')
    wallpaper = db.relationship('Wallpaper', back_populates='coments')

    def __repr__(self):
        return f'<Coment id={self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "fan": self.fan.serialize(),
            "wallpaper": self.wallpaper.serialize(),
        }
    
class Favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_fan = db.Column(db.Integer, db.ForeignKey('fan.id'), nullable=False)
    id_wallpaper = db.Column(db.Integer, db.ForeignKey('wallpaper.id'), nullable=False)
    fan = db.relationship('Fan')
    wallpaper = db.relationship('Wallpaper')

    def __repr__(self):
        return f'<Favoritos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "fan": self.fan.serialize(),
            "wallpaper": self.wallpaper.serialize()
        }

class MeGusta(db.Model):
    __tablename__ = 'me_gusta'
    id = db.Column(db.Integer, primary_key=True)
    id_fan = db.Column(db.Integer, db.ForeignKey('fan.id'), nullable=False)
    id_wallpaper = db.Column(db.Integer, db.ForeignKey('wallpaper.id'), nullable=False)
    fan = db.relationship('Fan')
    wallpaper = db.relationship('Wallpaper')

    def __repr__(self):
        return f'<MeGusta {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "fan": self.fan.serialize(),
            "wallpaper": self.wallpaper.serialize()
        }

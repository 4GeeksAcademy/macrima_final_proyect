  
import os
from flask_admin import Admin
from .models import db, User,Fan,Artista, Tags,Wallpaper,TagsWallpaper
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Tags, db.session))
    admin.add_view(ModelView(Fan, db.session))
    admin.add_view(ModelView(Artista, db.session))
    admin.add_view(ModelView(Wallpaper, db.session))
    admin.add_view(ModelView(TagsWallpaper, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
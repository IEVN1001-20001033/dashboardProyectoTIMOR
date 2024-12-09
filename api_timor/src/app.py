from flask import Flask
from extensions import con
from flask_cors import CORS, cross_origin
from config import config

#from flask import send_from_directory

from apis.usr_api import user_api
from apis.fobia_api import fobia_api
from apis.login_api import login_api
from apis.ventas_api import ventas_api
# from apis.graficas_api import graficas_api

app = Flask(__name__)
CORS(app)
app.config.from_object(config['development'])

app.config['UPLOAD_FOLDER'] = 'static/uploads'

con.init_app(app)

app.register_blueprint(user_api, url_prefix="/api/usr_api")
app.register_blueprint(fobia_api, url_prefix="/api/fobia_api")
app.register_blueprint(login_api, url_prefix="/api/login_api")
app.register_blueprint(ventas_api, url_prefix="/api/ventas_api")
# app.register_blueprint(graficas_api, url_prefix="/api/graficas_api")

# @app.route('/static/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def pagina_no_encontrada(error):
	return "<h1>Página no encontrada</h1>", 404

if __name__ =="__main__":
	app.config.from_object(config['development'])
	app.register_error_handler(404,pagina_no_encontrada)
	app.run(host='0.0.0.0',port=5000)
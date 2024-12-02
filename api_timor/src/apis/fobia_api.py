import os
from flask import app, request, jsonify, Blueprint, current_app, send_from_directory
from extensions import con
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


fobia_api = Blueprint('fobia_api', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@fobia_api.route('/fobias/subir_foto', methods=['POST'])
def subir_foto():
    if 'foto' not in request.files:
        return jsonify({'mensaje': 'No se envió un archivo', 'exito': False}), 400
    
    file = request.files['foto']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        public_url = f"/static/uploads/{filename}"

        return jsonify({'ruta': public_url, 'mensaje': 'Imagen subida exitosamente', 'exito': True})
    return jsonify({'mensaje': 'Archivo no permitido', 'exito': False}), 400

@fobia_api.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@fobia_api.route('/fobias/<mat>/actualizar_foto', methods=['PUT'])
def actualizar_foto(mat):
    try:
        if 'foto' not in request.files:
            return jsonify({'mensaje': 'No se envió un archivo', 'exito': False}), 400

        file = request.files['foto']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            public_url = f"/static/uploads/{filename}"

            cursor = con.connection.cursor()
            sql = """UPDATE fobias SET foto = '{}' WHERE idFobia = '{}'""".format(public_url, mat)
            cursor.execute(sql)
            con.connection.commit()

            return jsonify({'ruta': public_url, 'mensaje': 'Imagen actualizada exitosamente', 'exito': True})
        else:
            return jsonify({'mensaje': 'Archivo no permitido', 'exito': False}), 400
    except Exception as ex:
        return jsonify({'mensaje': f"Error: {ex}", 'exito': False}), 500

@fobia_api.route("/fobias/activas",methods=['GET'])
def lista_fobias_activas():
    try:
        cursor=con.connection.cursor()
        sql="select * from fobias where activa = 1"
        cursor.execute(sql)
        datos=cursor.fetchall()
        fobias=[]
        for fila in datos:
            fobia = {"idFobia": fila[0],
                    "nombre":fila[1],
                    "foto":fila[2],
                    "descripcion":fila[3],
                    "precio":fila[4],
                    "activa":fila[5],
                    }
            fobias.append(fobia)
        return jsonify({'fobias':fobias, 'mensaje':'Lista de fobias', 'exito':True})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex),'exito':False})
    


@fobia_api.route("/fobias",methods=['GET'])
def lista_fobias():
    try:
        cursor=con.connection.cursor()
        sql="select * from fobias"
        cursor.execute(sql)
        datos=cursor.fetchall()
        fobias=[]
        for fila in datos:
            fobia = {"idFobia": fila[0],
                    "nombre":fila[1],
                    "foto":fila[2],
                    "descripcion":fila[3],
                    "precio":fila[4],
                    "activa":fila[5],
                    }
            fobias.append(fobia)
        return jsonify({'fobias':fobias, 'mensaje':'Lista de fobias', 'exito':True})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex),'exito':False})
    

def leer_fobia_bd(matricula):
    try:
        cursor = con.connection.cursor()
        sql="select * from fobias where idFobia='{}'".format(matricula)

        cursor.execute(sql)
        datos = cursor.fetchone()
        
        if datos != None:

            fobia = {
                    "idFobia":datos[0],
                    "nombre":datos[1],
                    "foto":datos[2],
                    "descripcion":datos[3],
                    "precio":datos[4],
                    "activa":datos[5],
                    }
            return fobia
        else:
            return None
    except Exception as ex:

        return jsonify({"message": "error {}".format(ex),'exito': False})

@fobia_api.route("/fobias/<mat>",methods=['GET'])
def leer_fobia(mat):
    try:
        fobia = leer_fobia_bd(mat)
        if fobia != None:			
            return jsonify({'fobia':fobia, 'mensaje':'fobia encontrado', 'exito':True})
        else:			
            return jsonify({'fobia':fobia, 'mensaje':'fobia no encontrado', 'exito':False})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex),'exito':False})#, 500

@fobia_api.route("/fobias",methods=['POST'])
def registrar_fobia():
    try:
        fobia = leer_fobia_bd(request.json['idFobia'])
        if fobia != None:
            return jsonify({'mensaje':"fobia ya existe, no se puede duplicar",
                  'exito':False})
        
        foto_ruta = request.json['foto']

        cursor=con.connection.cursor()
        sql="""insert into fobias (idFobia,nombre,foto,descripcion,precio,activa)
            values ('{0}','{1}','{2}','{3}','{4}','{5}')""".format(
                request.json['idFobia'],
                request.json['nombre'],
                foto_ruta,
                request.json['descripcion'],
                request.json['precio'],
                request.json['activa'],
            )
        cursor.execute(sql)
        con.connection.commit()
        return jsonify({'mensaje': "fobia registrada", "exito": True})
        
    except Exception as ex:
        return jsonify({'mensaje':"Error {}".format(ex), 'exito': False})


@fobia_api.route('/fobias/<mat>', methods=['PUT'])
def actualizar_curso(mat):
    try:
            fobia = leer_fobia_bd(mat)
            if fobia != None:
                cursor = con.connection.cursor()
                sql = """UPDATE fobias SET nombre = '{0}', foto = '{1}', descripcion='{2}', precio='{3}', activa='{4}'
                WHERE idFobia = {5}""".format(request.json['nombre'], request.json['foto'], request.json['descripcion'], request.json['precio'],request.json['activa'], mat)
                cursor.execute(sql)
                con.connection.commit()
                return jsonify({'mensaje': "fobia actualizado.", 'exito': True})
            else:
                return jsonify({'mensaje': "fobia no encontrado.", 'exito': False})
    except Exception as ex:
        return jsonify({'mensaje': "Error {0} ".format(ex), 'exito': False})
 
@fobia_api.route('/fobias/<mat>', methods=['DELETE'])
def eliminar_curso(mat):
    try:
        fobia = leer_fobia_bd(mat)
        if fobia != None:
            cursor = con.connection.cursor()
            sql = "DELETE FROM fobias WHERE idFobia = {0}".format(mat)
            cursor.execute(sql)
            con.connection.commit()
            return jsonify({'mensaje': "fobia eliminado.", 'exito': True})
        else:
            return jsonify({'mensaje': "fobia no encontrado.", 'exito': False})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'exito': False})

import os
from flask import app, request, jsonify, Blueprint, current_app, send_from_directory
from extensions import con
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


user_api = Blueprint('user_api', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_api.route('/usuarios/subir_foto', methods=['POST'])
def subir_foto():
    if 'foto' not in request.files:
        return jsonify({'mensaje': 'No se envió un archivo', 'exito': False}), 400

    file = request.files['foto']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(filepath)

        public_url = f"/static/uploads/{filename}" 
        return jsonify({'ruta': public_url, 'mensaje': 'Imagen subida exitosamente', 'exito': True})
    else:
        return jsonify({'mensaje': 'Archivo no permitido', 'exito': False}), 400
    
    
@user_api.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@user_api.route('/usuarios/<mat>/actualizar_foto', methods=['PUT'])
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
            sql = """UPDATE usuarios SET foto = '{}' WHERE idUsr = '{}'""".format(public_url, mat)
            cursor.execute(sql)
            con.connection.commit()

            return jsonify({'ruta': public_url, 'mensaje': 'Imagen actualizada exitosamente', 'exito': True})
        else:
            return jsonify({'mensaje': 'Archivo no permitido', 'exito': False}), 400
    except Exception as ex:
        return jsonify({'mensaje': f"Error: {ex}", 'exito': False}), 500




@user_api.route("/usuarios",methods=['GET'])
def lista_usuarios():
    try:
        cursor=con.connection.cursor()
        sql="select * from usuarios"
        cursor.execute(sql)
        datos=cursor.fetchall()
        usuarios=[]
        for fila in datos:
            usuario={"idUsr":fila[0],
                    "nombre":fila[1],
                    "correo":fila[2],
                    "contrasena":fila[3],
                    "foto": fila[4],
                    "perfil":fila[5],
                    "activo":fila[6],
                    }
            usuarios.append(usuario)
        return jsonify({'usuarios':usuarios, 'mensaje':'Lista de usuarios', 'exito':True})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex),'exito':False})
    

def leer_usuario_bd(matricula):
    try:
        cursor = con.connection.cursor()
        sql="select * from usuarios where idUsr='{}'".format(matricula)

        cursor.execute(sql)
        datos = cursor.fetchone()
        
        if datos != None:

            usuario = {
                    "idUsr":datos[0],
                    "nombre":datos[1],
                    "correo":datos[2],
                    "contrasena":datos[3],
                    "foto":datos[4],
                    "perfil":datos[5],
                    "activo":datos[6],
                    }
            return usuario
        else:
            return None
    except Exception as ex:

        return jsonify({"message": "error {}".format(ex),'exito': False})

@user_api.route("/usuarios/<mat>",methods=['GET'])
def leer_usuario(mat):
    try:
        usuario = leer_usuario_bd(mat)
        if usuario != None:			
            return jsonify({'usuario':usuario, 'mensaje':'usuario encontrado', 'exito':True})
        else:			
            return jsonify({'usuario':usuario, 'mensaje':'usuario no encontrado', 'exito':False})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex),'exito':False})#, 500

@user_api.route("/usuarios", methods=['POST'])
def registrar_usuario():
    try:
        usuario = leer_usuario_bd(request.json['idUsr'])
        if usuario != None:
            return jsonify({'mensaje': "usuario ya existe, no se puede duplicar", 'exito': False})

        foto_ruta = request.json['foto']  

        cursor = con.connection.cursor()
        sql = """INSERT INTO usuarios (idUsr, nombre, correo, contrasena, foto, perfil, activo)
                 VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}')""".format(
            request.json['idUsr'],
            request.json['nombre'],
            request.json['correo'],
            request.json['contrasena'],
            foto_ruta, 
            request.json['perfil'],
            request.json['activo']
        )
        cursor.execute(sql)
        con.connection.commit()
        return jsonify({'mensaje': "usuario registrado", "exito": True})
    except Exception as ex:
        return jsonify({'mensaje': "Error {}".format(ex), 'exito': False})


@user_api.route('/usuarios/<mat>', methods=['PUT'])
def actualizar_curso(mat):
    try:
            usuario = leer_usuario_bd(mat)
            if usuario != None:
                cursor = con.connection.cursor()
                sql = """UPDATE usuarios SET nombre = '{0}', correo = '{1}', contrasena='{2}', foto='{3}', perfil='{4}', activo='{5}'
                WHERE idUsr = {6}""".format(request.json['nombre'], request.json['correo'], request.json['contrasena'],request.json['foto'], request.json['perfil'],request.json['activo'], mat)
                cursor.execute(sql)
                con.connection.commit()
                return jsonify({'mensaje': "usuario actualizado.", 'exito': True})
            else:
                return jsonify({'mensaje': "usuario no encontrado.", 'exito': False})
    except Exception as ex:
        return jsonify({'mensaje': "Error {0} ".format(ex), 'exito': False})
 
@user_api.route('/usuarios/<mat>', methods=['DELETE'])
def eliminar_curso(mat):
    try:
        usuario = leer_usuario_bd(mat)
        if usuario != None:
            cursor = con.connection.cursor()
            sql = "DELETE FROM usuarios WHERE idUsr = {0}".format(mat)
            cursor.execute(sql)
            con.connection.commit()
            return jsonify({'mensaje': "usuario eliminado.", 'exito': True})
        else:
            return jsonify({'mensaje': "usuario no encontrado.", 'exito': False})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'exito': False})

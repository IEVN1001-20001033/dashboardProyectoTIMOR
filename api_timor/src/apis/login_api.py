from flask import Flask, request, jsonify, Blueprint
from extensions import con

login_api = Blueprint('login_api', __name__)

@login_api.route('/usuarios/login', methods=['POST'])
def login():
    try:
        data = request.json
        correo = data['correo']
        contrasena = data['contrasena']

        cursor = con.connection.cursor()
        sql = "SELECT idUsr, nombre, foto, perfil FROM usuarios WHERE correo = %s AND contrasena = %s"
        cursor.execute(sql, (correo, contrasena))
        usuario = cursor.fetchone()

        if usuario:
            return jsonify({
                'exito': True,
                'mensaje': 'Inicio de sesión exitoso',
                'usuario': {
                    'idUsr': usuario[0],
                    'nombre': usuario[1],
                    'foto': usuario[2],
                    'perfil': usuario[3]
                }
            })
        else:
            return jsonify({'exito': False, 'mensaje': 'Credenciales incorrectas'}), 401
    except Exception as ex:
        return jsonify({'exito': False, 'mensaje': f'Error: {ex}'})

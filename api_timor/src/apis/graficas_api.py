# from flask import Flask, request, jsonify, Blueprint
# from extensions import con

# graficas_api = Blueprint('graficas_api', __name__)

# @graficas_api.route('/suscripciones/mes', methods=['GET'])
# def suscripciones_por_mes():
#     try:
#         cursor = con.cursor(dictionary=True)
#         query = """
#             SELECT MONTH(fecha_venta) as mes, COUNT(*) as total
#             FROM suscripciones
#             GROUP BY MONTH(fecha_venta)
#             ORDER BY mes;
#         """
#         cursor.execute(query)
#         results = cursor.fetchall()
#         cursor.close()
#         return jsonify(results), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         con.close()

# @graficas_api.route('/suscripciones/fobia', methods=['GET'])
# def suscripciones_por_fobia():
#     try:
#         mes = request.args.get('mes')
#         cursor = con.cursor(dictionary=True)
        
#         if mes:
#             query = """
#                 SELECT idFobia, COUNT(*) as total
#                 FROM suscripciones
#                 WHERE MONTH(fecha_venta) = %s
#                 GROUP BY idFobia;
#             """
#             cursor.execute(query, (mes,))
#         else:
#             query = """
#                 SELECT idFobia, COUNT(*) as total
#                 FROM suscripciones
#                 GROUP BY idFobia;
#             """
#             cursor.execute(query)
        
#         results = cursor.fetchall()
#         cursor.close()
#         return jsonify(results), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         con.close()

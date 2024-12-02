from flask import Flask, request, jsonify, Blueprint
from extensions import con

ventas_api = Blueprint('ventas_api', __name__)

@ventas_api.route('/ventas/datos', methods=['GET'])
def obtener_datos_ventas():
    try:
        cursor = con.connection.cursor()
        sql =  """
            SELECT fecha_venta, monto_pagado, idFobia 
            FROM ventas
        """
        cursor.execute(sql)
        ventas = cursor.fetchall()
        cursor.close()
        datos = [
            {"fecha_venta": venta[0].strftime('%Y-%m-%d'), "monto_pagado": venta[1], "idFobia": venta[2]}
            for venta in ventas
        ]
        return jsonify(datos), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ventas_api.route('/ventas/agrupadas', methods=['GET'])
def obtener_ventas_agrupadas():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    cursor = con.cursor(dictionary=True)
    
    cursor.execute("""
        SELECT 
            DATE(fecha_venta) AS fecha, 
            SUM(monto_pagado) AS total_ventas 
        FROM ventas 
        GROUP BY DATE(fecha_venta)
        ORDER BY fecha
    """)
    
    ventas_agrupadas = cursor.fetchall()
    cursor.close()
    con.close()
    
    return jsonify(ventas_agrupadas)

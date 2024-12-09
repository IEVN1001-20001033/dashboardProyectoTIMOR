from flask import Flask, request, jsonify, Blueprint
from extensions import con

ventas_api = Blueprint('ventas_api', __name__)

@ventas_api.route('/ventas/datos', methods=['GET'])
def obtener_datos_ventas():
    try:
        cursor = con.connection.cursor()
        sql =  """
            SELECT fecha_venta, monto_pagado, idFobia 
            FROM suscripciones
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
    
@ventas_api.route('/ventas/ventas-mensuales', methods=['GET'])
def obtener_ventas_mensuales():
    try:
        cursor = con.connection.cursor()
        query = """
        SELECT 
            YEAR(fecha_compra) AS anio,
            MONTH(fecha_compra) AS mes,
            SUM(monto) AS total_ventas
        FROM 
            compras
        GROUP BY 
            YEAR(fecha_compra), 
            MONTH(fecha_compra)
        ORDER BY 
            anio, 
            mes;
        """
        cursor.execute(query)
        resultados = cursor.fetchall()
        cursor.close()
        return jsonify(resultados), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@ventas_api.route('/ventas/fobias', methods=['GET'])
def obtener_fobias():
    try:
        cursor = con.connection.cursor()
        query = """
        SELECT 
            f.nombre AS fobia,
            YEAR(s.fecha_venta) AS anio,
            MONTH(s.fecha_venta) AS mes,
            SUM(s.monto_pagado) AS total_monto
        FROM 
            suscripciones s
        JOIN 
            fobias f
        ON 
            s.idFobia = f.idFobia
        GROUP BY 
            f.nombre, 
            YEAR(s.fecha_venta), 
            MONTH(s.fecha_venta)
        ORDER BY 
            f.nombre, 
            anio, 
    mes;
        """
        cursor.execute(query)
        resultados = cursor.fetchall()
        cursor.close()
        return jsonify(resultados), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


    
@ventas_api.route('/ventas/fobias-mes', methods=['GET'])
def obtener_fobias_mes():
    try:
        cursor = con.connection.cursor()
        query = """
        SELECT 
            f.nombre AS fobia,
            YEAR(s.fecha_venta) AS anio,
            MONTH(s.fecha_venta) AS mes,
            COUNT(*) AS cantidad_suscripciones
        FROM 
            suscripciones s
        JOIN 
            fobias f ON s.idFobia = f.idFobia
        GROUP BY 
            f.nombre, 
            YEAR(s.fecha_venta), 
            MONTH(s.fecha_venta)
        ORDER BY 
            f.nombre, 
            anio, 
            mes;
        """
        cursor.execute(query)
        resultados = cursor.fetchall()
        cursor.close()
        return jsonify(resultados), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


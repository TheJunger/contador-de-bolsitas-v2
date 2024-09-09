from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'yametekudasai'  # Cambia esto a un valor seguro
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)
CORS(app, origins=["*"])
jwt = JWTManager(app)

# 1. LOGIN/REGISTER

@app.route('/api/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    hashed_password = generate_password_hash(password)
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()

    return jsonify(message='User registered successfully'), 201

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT password FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user[0], password):
        access_token = create_access_token(identity=username)
        print('login correcto')
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message='Invalid credentials'), 401
    
# 2. BOLSITAS

@app.route("/api/get-data-bolsitas", methods=["GET"])
@jwt_required()
def get_data_bolsitas():
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsitas')
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Dueño", "Color", "Grosor", "Selladas", "Sin_Sellar", "Total"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/get-data-bolsones", methods=["GET"])
@jwt_required()
def get_data_bolsones():
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsones_deposito')
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Dueño", "Grosor", "Color", "Cantidad", "Remanentes"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/get-data-bolsas", methods=["GET"])
@jwt_required()
def get_data_bolsas():
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsas_harina')
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Total", "Usadas", "Restantes", "Dueño"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)



@app.route("/api/get-specific-data-bolsitas", methods=["POST"])
@jwt_required()
def get_specific_data_bolsitas():
    id = request.json["bolsitaid"]
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsitas WHERE id_bolsita = ?', (id,))
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Dueño", "Color", "Grosor", "Selladas", "Sin_Sellar", "Total"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/get-specific-data-bolsones", methods=["POST"])
@jwt_required()
def get_specific_data_bolsones():
    id = request.json["bolsonId"]
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsones_deposito WHERE id_dbolsones = ?', (id,))
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Dueño", "Grosor", "Color", "Cantidad", "Remanentes"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/get-specific-data-bolsas", methods=["POST"])
@jwt_required()
def get_specific_data_bolsas():
    id = request.json["harinaid"]
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM bolsas_harina WHERE id_harina = ?', (id,))
    data = cursor.fetchall()
    conn.close()
    columns = ["ID","Total", "Usadas", "Restantes", "Dueño"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)


@app.route("/api/save-data-bolsitas", methods=["PUT"])
@jwt_required()
def save_data_bolsitas():
    id = request.json["bolsitaid"]
    nuevo_valor_selladas = request.json["nuevoValorSelladas"]
    nuevo_valor_sin_sellar = request.json["nuevoValorSinSellar"]
    print(id)
    print(nuevo_valor_selladas)
    print(nuevo_valor_sin_sellar)

    conn = sqlite3.connect("/home/TheJunger/mysite/database.db")
    cursor = conn.cursor()
    
    cursor.execute(f'UPDATE bolsitas SET selladas = ?, sin_sellar = ? WHERE id_bolsita = ?', 
                   (nuevo_valor_selladas, nuevo_valor_sin_sellar, id))
    conn.commit()
    conn.close()
    
    return jsonify(message='Data updated successfully'), 200


@app.route("/api/save-data-bolsas", methods=["PUT"])
@jwt_required()
def save_data_bolsas():
    id = request.json["bolsaid"]
    nuevo_valor_total = request.json["nuevoValorTotal"]
    nuevo_valor_usadas = request.json["nuevoValorUsadas"]
    nuevo_valor_restantes = request.json["nuevoValorRestanes"]

    conn = sqlite3.connect("/home/TheJunger/mysite/database.db")
    cursor = conn.cursor()
    
    cursor.execute(f'UPDATE bolsas_harina SET total = ?, usadas = ?, restantes = ? WHERE id_harina = ?', 
                   (nuevo_valor_total, nuevo_valor_usadas, nuevo_valor_restantes, id))
    conn.commit()
    conn.close()
    
    return jsonify(message='Data updated successfully'), 200

@app.route("/api/save-data-bolsones", methods=["PUT"])
@jwt_required()
def save_data_bolsones():
    id = request.json["bolsonId"]
    nuevo_valor_total = request.json["nuevoValorTotal"]
    nuevo_valor_remanentes = request.json["nuevoValorRemanentes"]

    conn = sqlite3.connect("/home/TheJunger/mysite/database.db")
    cursor = conn.cursor()
    
    cursor.execute(f'UPDATE bolsones_deposito SET cantidad = ?, remanentes = ? WHERE id_dbolsones = ?', 
                   (nuevo_valor_total, nuevo_valor_remanentes, id))
    conn.commit()
    conn.close()
    
    return jsonify(message='Data updated successfully'), 200

# endpoint para crear produccion, editar produccion, eliminar produccion y otro claro, para obtener los datos, y uno para descargar todos los datos



@app.route("/api/get-data-produccion", methods=["GET"])
@jwt_required()
def get_data_produccion():
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM produccion ORDER BY fecha DESC LIMIT 10')
    data = cursor.fetchall()
    conn.close()
    columns = ["ID", "Fecha", "Dueño", "Grosor", "Color", "Cantidad", "Fecha_Real"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/get-specific-data-produccion", methods=["POST"])
@jwt_required()
def get_specific_data_produccion():
    id = request.json["produccionID"]
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM produccion WHERE prod_id = ?', (id,))
    data = cursor.fetchall()
    conn.close()
    columns = ["ID", "Fecha", "Dueño", "Grosor", "Color", "Cantidad", "Fecha_Real"]
    result = [dict(zip(columns,row)) for row in data]
    return jsonify(result)

@app.route("/api/add-data-produccion", methods=["PUT"])
@jwt_required()
def add_data_produccion():
    fecha = request.json["fecha"]
    dueño = request.json["dueño"]
    grosor = request.json["grosor"]
    color = request.json["color"]
    cantidad = request.json["cantidad"]
    fecha_real = datetime.now().strftime("%d/%m/%y")
    if (grosor == "grosorUno"):
        grosor = 1
    elif (grosor == "grosorDos"):
        grosor = 2
    elif (grosor == "grosorTres"):
        grosor = 3
    elif (grosor == "grosorCuatro"):
        grosor = 4
    conn = sqlite3.connect("/home/TheJunger/mysite/database.db")
    cursor = conn.cursor()
    cursor.execute(f'INSERT INTO produccion (fecha, dueño, grosor, color, cantidad, fecha_real) VALUES (?, ?, ?, ?, ?, ?)', 
                   (fecha, dueño, grosor, color, cantidad, fecha_real))
    conn.commit()
    conn.close()
    return jsonify(message='Data created successfully'), 200

@app.route("/api/remove-data-produccion", methods=["PUT"])
@jwt_required()
def delete_data_produccion():
    id = request.json["produccionID"]
    conn = sqlite3.connect('/home/TheJunger/mysite/database.db')
    cursor = conn.cursor()
    cursor.execute(f'DELETE FROM produccion WHERE prod_id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify(message='Data remove successfully'), 200

@app.route("/api/edit-data-produccion", methods=["PUT"])
@jwt_required()
def edit_data_produccion():
    id = request.json["produccionID"]
    fecha = request.json["fecha"]
    dueño = request.json["dueño"]
    grosor = request.json["grosor"]
    color = request.json["color"]
    cantidad = request.json["cantidad"]

    if (grosor == "grosorUno"):
        grosor = 1
    elif (grosor == "grosorDos"):
        grosor = 2
    elif (grosor == "grosorTres"):
        grosor = 3
    elif (grosor == "grosorCuatro"):
        grosor = 4

    conn = sqlite3.connect("/home/TheJunger/mysite/database.db")
    cursor = conn.cursor()
    
    cursor.execute(f'UPDATE produccion SET fecha = ?, dueño = ?, grosor = ?, color = ?, cantidad = ? WHERE prod_id = ?', 
                   (fecha, dueño, grosor, color, cantidad, id))
    conn.commit()
    conn.close()
    
    return jsonify(message='Data created successfully'), 200

def download_all_data_produccion():
    return 'test'

# Inicia el servidor
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050,debug=True)
    print('start')
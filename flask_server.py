from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import ast
import mysql.connector

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cafe"
)
db_cursor = db.cursor(dictionary=True)
db_cursor.execute("SET SESSION MAX_EXECUTION_TIME=500;")


@app.route("/cafes", methods=["GET"])
@cross_origin()
def get_cafes():
    location = request.args.get("location")
    if not location:
        db_cursor.execute("SELECT c.name, c.description, t.employees, c.logo, c.location, c.id FROM cafe_data c LEFT JOIN (SELECT cafe_id, COUNT(cafe_id) AS employees FROM employee_data GROUP BY cafe_id) t ON c.id = t.cafe_id ORDER BY t.employees DESC;")
    elif location not in ("North", "South", "East", "West", "Central"):
        return []
    else:
        db_cursor.execute(f"SELECT c.name, c.description, t.employees, c.logo, c.location, c.id FROM cafe_data c LEFT JOIN (SELECT cafe_id, count(cafe_id) AS employees FROM employee_data GROUP BY cafe_id) t ON c.id = t.cafe_id WHERE location='{location}' ORDER BY t.employees DESC;")
    cafes = list(db_cursor.fetchall())

    return cafes

@app.route("/cafe", methods=["POST"])
@cross_origin()
def create_cafe():
    # retrieve variables from the request
    name = request.args.get("name")
    description = request.args.get("description")
    location = request.args.get("location")
    logo = ast.literal_eval(request.data.decode("UTF-8")).get("logo")

    # retrieve the current max id from table cafe_data
    db_cursor.execute("SELECT COALESCE(MAX(sn), 0) AS idx FROM cafe_data;")
    idx = db_cursor.fetchone()["idx"]
    next_id = "CAFE" + f"{idx+1}".zfill(3)

    # run insert query
    query = "INSERT INTO cafe_data (id, name, description, logo, location) VALUES(%s, %s, %s, %s, %s);"
    try:
        db_cursor.execute(query, (next_id, name, description, logo, location))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))
    
    return jsonify(success=True)

@app.route("/cafe", methods=["PUT"])
@cross_origin()
def update_cafe():
    # retrieve variables from the request
    cafe_id = request.args.get("id")
    name = request.args.get("name")
    description = request.args.get("description")
    location = request.args.get("location")
    logo = ast.literal_eval(request.data.decode("UTF-8")).get("logo")

    # update relevant row in table cafe_data
    query = "UPDATE cafe_data SET name = %s, description=%s, logo=%s, location=%s WHERE id=%s;"
    try:
        db_cursor.execute(query, (name, description, logo, location, cafe_id))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

@app.route("/cafe", methods=["DELETE"])
@cross_origin()
def delete_cafe():
    # retrieve variables from the request
    cafe_id = ast.literal_eval(request.data.decode("UTF-8")).get("id")

    # delete relevant row in table cafe_data
    query = "DELETE FROM cafe_data WHERE id=%s;"
    try:
        db_cursor.execute(query, (cafe_id,))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    # delete all employees FROM the cafe in table employee_data
    query = "DELETE FROM employee_data WHERE cafe_id=%s;"
    try:
        db_cursor.execute(query, (cafe_id,))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

@app.route("/employees", methods=["GET"])
@cross_origin()
def get_employees():
    cafe_id = request.args.get("cafeId")

    if not cafe_id:
        db_cursor.execute("SELECT e.id, e.name, e.gender, e.email_address, e.phone_number, DATEDIFF(current_date(), e.start_date) AS days_worked,c.name AS cafe_name FROM employee_data e LEFT JOIN cafe_data c ON e.cafe_id = c.id ORDER BY days_worked DESC;")
    else:
        db_cursor.execute(f"SELECT e.id, e.name, e.gender, e.email_address, e.phone_number, DATEDIFF(current_date(), e.start_date) AS days_worked,c.name AS cafe_name FROM employee_data e JOIN cafe_data c WHERE e.cafe_id = c.id AND c.id = '{cafe_id}' ORDER BY days_worked DESC;")
    employees = list(db_cursor.fetchall())
    return employees

@app.route("/employee", methods=["POST"])
@cross_origin()
def create_employee():
    # retrieve variables from the request
    name = request.args.get("name")
    gender = request.args.get("gender")
    email_address = request.args.get("email_address")
    phone_number = request.args.get("phone_number")
    start_date = request.args.get("start_date")
    cafe = request.args.get("cafe")

    # retrieve the current max id from table employee_data
    db_cursor.execute("SELECT COALESCE(MAX(sn), 0) AS idx FROM employee_data;")
    idx = db_cursor.fetchone()["idx"]
    next_id = "UI" + f"{idx+1}".zfill(9)

    # get cafe_id from cafe_data table to insert AS relationship
    query = "SELECT id FROM cafe_data WHERE name = %s;"
    db_cursor.execute(query, (cafe,))
    cafe_id = db_cursor.fetchone()["id"]

    # run insert query
    query = "INSERT INTO employee_data (id, name, email_address, phone_number, gender, cafe_id, start_date) VALUES(%s, %s, %s, %s, %s, %s, %s);"
    try:
        db_cursor.execute(query, (next_id, name, email_address, phone_number, gender, cafe_id, start_date))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))
    
    return jsonify(success=True)

@app.route("/employee", methods=["PUT"])
@cross_origin()
def update_employee():
    # retrieve variables from the request
    employee_id = request.args.get("id")
    name = request.args.get("name")
    gender = request.args.get("gender")
    email_address = request.args.get("email_address")
    phone_number = request.args.get("phone_number")
    start_date = request.args.get("start_date")
    cafe = request.args.get("cafe")

    # get cafe_id from cafe_data table to insert AS relationship
    query = "SELECT id FROM cafe_data WHERE name = %s;"
    db_cursor.execute(query, (cafe,))
    cafe_id = db_cursor.fetchone()["id"]

    # update relevant row in table employee_data
    query = "UPDATE employee_data SET name = %s, email_address = %s, phone_number = %s, gender = %s, cafe_id = %s, start_date = %s WHERE id=%s;"
    try:
        db_cursor.execute(query, (name, email_address, phone_number, gender, cafe_id, start_date, employee_id))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

@app.route("/employee", methods=["DELETE"])
@cross_origin()
def delete_employee():
    # retrieve variables from the request
    employee_id = ast.literal_eval(request.data.decode("UTF-8")).get("id")

    # delete relevant row in table employee_data
    query = "DELETE FROM employee_data WHERE id=%s;"
    try:
        db_cursor.execute(query, (employee_id,))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

if __name__ == "__main__":
    app.run()

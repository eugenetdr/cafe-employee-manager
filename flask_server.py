from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cafe"
)
db_cursor = db.cursor(dictionary=True)
db_cursor.execute("SET SESSION MAX_EXECUTION_TIME=500;")


@app.route("/cafes", methods=["GET"])
def get_cafes(location=None):
    location = request.args.get("location")
    if not location:
        db_cursor.execute("select c.name, c.description, t.employees, c.logo, c.location, c.id  from cafe_data c join (select cafe_id, count(cafe_id) as employees from employee_data group by cafe_id) t where c.id = t.cafe_id order by t.employees desc;")
    elif location not in ("North", "South", "East", "West", "Central"):
        return []
    else:
        db_cursor.execute(f"SELECT id, name, description, logo, location FROM cafe_data WHERE location='{location}'")
    cafes = list(db_cursor.fetchall())

    return cafes

@app.route("/cafe", methods=["POST"])
def create_cafe():
    # retrieve variables from the request
    name = request.args.get("name")
    description = request.args.get("description")
    location = request.args.get("location")

    # retrieve the current max id from table cafe_data
    db_cursor.execute("SELECT COALESCE(MAX(sn), 0) as idx FROM cafe_data;")
    idx = db_cursor.fetchone()["idx"]
    next_id = "CAFE" + f"{idx+1}".zfill(3)

    # run insert query
    query = "INSERT INTO cafe_data (id, name, description, location) VALUES(%s, %s, %s, %s);"
    try:
        db_cursor.execute(query, (next_id, name, description, location))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))
    
    return jsonify(success=True)

@app.route("/cafe", methods=["PUT"])
def update_cafe():
    # retrieve variables from the request
    cafe_id = request.args.get("id")
    name = request.args.get("name")
    description = request.args.get("description")
    location = request.args.get("location")

    # update relevant row in table cafe_data
    query = "UPDATE cafe_data SET name = %s, description=%s, location=%s WHERE id=%s;"
    try:
        db_cursor.execute(query, (name, description, location, cafe_id))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

@app.route("/cafe", methods=["DELETE"])
def delete_cafe():
    # retrieve variables from the request
    cafe_id = request.args.get("id")

    # delete relevant row in table cafe_data
    query = "DELETE FROM cafe_data WHERE id=%s;"
    try:
        db_cursor.execute(query, (cafe_id,))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    # delete all employees from the cafe in table employee_data
    query = "DELETE FROM employee_data WHERE cafe_id=%s;"
    try:
        db_cursor.execute(query, (cafe_id,))
        db.commit()
    except Exception as e:
        return jsonify(success=False, error=str(e))

    return jsonify(success=True)

@app.route("/employees", methods=["GET"])
def get_employees():
    cafe = request.args.get("cafe")

    if not cafe:
        db_cursor.execute("select e.id, e.name, e.email_address, e.phone_number, DATEDIFF(current_date(), e.start_date) as days_worked,c.name as cafe_name from employee_data e left join cafe_data c on e.cafe_id = c.id order by days_worked desc;")
    else:
        db_cursor.execute(f"select e.id, e.name, e.email_address, e.phone_number, DATEDIFF(current_date(), e.start_date) as days_worked,c.name as cafe_name from employee_data e join cafe_data c where e.cafe_id = c.id and c.name = '{cafe}' order by days_worked desc;")
    employees = list(db_cursor.fetchall())
    return employees

@app.route("/employee", methods=["POST"])
def create_employee():
    # retrieve variables from the request
    name = request.args.get("name")
    gender = request.args.get("gender")
    email_address = request.args.get("email_address")
    phone_number = request.args.get("phone_number")
    start_date = request.args.get("start_date")
    cafe = request.args.get("cafe")

    # retrieve the current max id from table employee_data
    db_cursor.execute("SELECT COALESCE(MAX(sn), 0) as idx FROM employee_data;")
    idx = db_cursor.fetchone()["idx"]
    next_id = "UI" + f"{idx+1}".zfill(9)

    # get cafe_id from cafe_data table to insert as relationship
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
def update_employee():
    # retrieve variables from the request
    employee_id = request.args.get("id")
    name = request.args.get("name")
    gender = request.args.get("gender")
    email_address = request.args.get("email_address")
    phone_number = request.args.get("phone_number")
    start_date = request.args.get("start_date")
    cafe = request.args.get("cafe")

    # get cafe_id from cafe_data table to insert as relationship
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
def delete_employee():
    # retrieve variables from the request
    employee_id = request.args.get("id")

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

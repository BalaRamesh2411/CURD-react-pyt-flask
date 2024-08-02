
# A very simple Flask Hello World app for you to get started with...
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="BALARAMESH2411",
    password="agaram12345",
    hostname="BALARAMESH2411.mysql.pythonanywhere-services.com",
    databasename="BALARAMESH2411$MYSQLdatabase",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# create table
class Todo(db.Model):
   __tablename__ = "EMPLOYEES"
   emp_id = db.Column(db.Integer,primary_key = True, autoincrement = True)
   emp_name = db.Column(db.String)

# read todo
@app.route('/getTodo',methods = ["GET"])
def getTodo():
    getTodos = Todo.query.all()
    return jsonify([
        {"id" : todo.emp_id, "name": todo.emp_name} for todo in getTodos
    ])

# insert values todo
@app.route('/addTodo', methods=["GET","POST"])
def setTodo_list():
    if request.method=="POST":
        setdata=Todo(emp_name=request.form["name"])
        db.session.add(setdata)
        db.session.commit()

    return "success"

# delete todo
@app.route("/deleteTodo/<int:todoId>", methods = ["DELETE"])
def deleteTodo(todoId):
    deleteTodo = Todo.query.filter_by(emp_id= todoId).first()
    db.session.delete(deleteTodo)
    db.session.commit()

    return jsonify({"message" :"delete success"})

# edit todo
@app.route("/editTodo/<int:todoId>", methods = ["GET"])
def editTodo(todoId):

    editTodo = Todo.query.filter_by(emp_id= todoId).first()

    if editTodo is None:
       return jsonify("user not found"),404

    return jsonify ({ "emp_id" : editTodo.emp_id, "emp_name" : editTodo.emp_name}),200


# update
@app.route("/updateTodo/<int:todoId>", methods = ["PUT"])
def updateTodo(todoId):

    todo=Todo.query.filter_by(emp_id = todoId).first()
    new_name=request.form
    todo.emp_name=new_name["item"]
    db.session.commit()
    return f'update user is {todoId}',200






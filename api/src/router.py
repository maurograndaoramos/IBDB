from fastapi import APIRouter, Request
from pydantic import BaseModel
import mysql.connector

api_router = APIRouter(
    prefix="/api",
    tags=["api"],
)

db_config = {
    "host":"localhost:33060",
    "user":"user",
    "password":"password",
    "database":"db",
    "auth_plugin":"",
}

def createConnection ():
    return mysql.connector.connect(**db_config)

class User(BaseModel):
    user_id: int
    username: str
    email: str

@api_router.get("/users")
async def get_call():
    connection = createConnection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("select * from users;")
    users = cursor.fetchall()

    connection.close()
    return users

# @api_router.post("/create_user/")
# async def create_user(user_data: User):
#     user_id = user_data.user_id
#     username = user_data.username
#     return {
#         "msg": "we got data succesfully",
#         "user_id": user_id,
#         "username": username,
#     }


@api_router.post("/users")
async def post_call(_: Request):
    return {"message": "You successfully POST called the API!"}


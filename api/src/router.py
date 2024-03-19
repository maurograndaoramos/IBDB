from fastapi import APIRouter, Request, HTTPException
import mysql.connector
import random
import string
from pydantic import BaseModel

api_router = APIRouter(
    prefix="/api",
    tags=["api"],
)

db_config = {
    "host": "mysql",
    "user": "user",
    "password": "password",
    "database": "db",
    "auth_plugin": "",
}

class UserLogin(BaseModel):
    username: str
    email: str
    password: str
    hash: str

def createConnection():
    return mysql.connector.connect(**db_config)

@api_router.post("/users/")
async def post_call(user_login: UserLogin):
    email = user_login.email
    password = user_login.password

    connection = createConnection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("select * from users where email = %s AND password = %s;", (email, password))
    user = cursor.fetchone()

    connection.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return user

@api_router.post("/user_hash/")
async def post_call(user_login: UserLogin):
    hash_value  = user_login.hash

    connection = createConnection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("select * from users where hash = %s;", (hash_value,))
    user = cursor.fetchone()

    connection.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return user

@api_router.post("/create_user/")
async def post_call(user_login: UserLogin):
    username = user_login.username
    email = user_login.email.lower()
    password = user_login.password
    
    connection = createConnection()
    cursor = connection.cursor(dictionary=True)

    random_hash = ''.join(random.choices(string.ascii_lowercase, k=32))

    cursor.execute("insert into users (username, email, password, hash) values(%s, %s, %s, %s);", (username, email, password, random_hash))
    connection.commit()
    connection.close()

    return {"message": "User created successfully"}
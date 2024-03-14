from fastapi import APIRouter, Request

api_router = APIRouter(
    prefix="/api",
    tags=["api"],
)

class User(BaseModel):
    user_id: int
    username: str
    email: str
    isAdmin: int
    hash: str

@api_router.get("/users")
async def get_call(_: Request):
    return {"message": "You successfully GET called the API!"}

@app.post("/create_user/")
async def create_user(user_data: UserCreate):
    user_id = user_data.user_id
    username = user_data.username
    return {
        "msg": "we got data succesfully",
        "user_id": user_id,
        "username": username,
    }


@api_router.post("/company")
async def post_call(_: Request):
    return {"message": "You successfully POST called the API!"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import api_router
from uvicorn import run


app = FastAPI()

app.include_router(router=api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

if __name__ == "__main__":
    run(app, host="0.0.0.0", port=8001)

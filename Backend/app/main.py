from fastapi import FastAPI
from app.routes import auth
from app.database import engine
from app.models import Base
from app.routes import vendor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://10.233.22.163:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)



app.include_router(auth.router, tags=["Authentication"])

@app.get("/")
def home():
    return {"message":"Welcome to NovaAI Backend"}

#customer
from app.routes import customer

app.include_router(customer.router, tags=["Customer"])

#vendor
app.include_router(vendor.router, tags=["Vendor"])


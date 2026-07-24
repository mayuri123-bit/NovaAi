from fastapi import FastAPI
from app.routes import auth
from app.database import engine
from app.models import Base
from app.routes import vendor

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, tags=["Authentication"])

@app.get("/")
def home():
    return {"message":"Welcome to NovaAI Backend"}

#customer
from app.routes import customer

app.include_router(customer.router, tags=["Customer"])

#vendor
app.include_router(vendor.router, tags=["Vendor"])
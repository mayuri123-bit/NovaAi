from sqlalchemy import Column, Integer, String
from app.database import Base
from app.database import engine, Base
from app import models

Base.metadata.create_all(bind=engine)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)

#Quotation Model
from sqlalchemy import Column, Integer, String

class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    customer_email = Column(String(100), nullable=False)
    mobile = Column(String(15), nullable=False)
    address = Column(String(255), nullable=False)
    solar_capacity = Column(String(50), nullable=False)
    status = Column(String(20), default="Pending")


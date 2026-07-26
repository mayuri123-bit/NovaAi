from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

#Qutotaion request
class QuotationRequest(BaseModel):
    customer_name: str
    customer_email: EmailStr
    mobile: str
    address: str
    solar_capacity: str

class UpdateQuotationStatus(BaseModel):
    status: str

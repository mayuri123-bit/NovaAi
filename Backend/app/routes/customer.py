from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Quotation
from app.schemas import QuotationRequest

router = APIRouter()

@router.post("/quotation")
def request_quotation(data: QuotationRequest, db: Session = Depends(get_db)):

    quotation = Quotation(
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        mobile=data.mobile,
        address=data.address,
        solar_capacity=data.solar_capacity
    )

    db.add(quotation)
    db.commit()
    db.refresh(quotation)

    return {
        "message": "Quotation Requested Successfully"
    }
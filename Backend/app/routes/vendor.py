from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Quotation

router = APIRouter()

@router.get("/quotations")
def get_all_quotations(db: Session = Depends(get_db)):

    quotations = db.query(Quotation).all()

    return quotations

from fastapi import HTTPException
from app.schemas import UpdateQuotationStatus

@router.put("/quotation/{quotation_id}")
def update_status(
    quotation_id: int,
    data: UpdateQuotationStatus,
    db: Session = Depends(get_db)
):

    quotation = db.query(Quotation).filter(
        Quotation.id == quotation_id
    ).first()

    if quotation is None:
        raise HTTPException(
            status_code=404,
            detail="Quotation not found"
        )

    quotation.status = data.status

    db.commit()
    db.refresh(quotation)

    return {
        "message": "Quotation Status Updated",
        "status": quotation.status
    }
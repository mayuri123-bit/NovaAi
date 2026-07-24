from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Quotation

router = APIRouter()

@router.get("/quotations")
def get_all_quotations(db: Session = Depends(get_db)):

    quotations = db.query(Quotation).all()

    return quotations
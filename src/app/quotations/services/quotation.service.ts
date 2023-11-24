import { Injectable } from '@angular/core';
import { Quotation, QuotationDto } from '../models/quotation';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor() {}

  public createQuotation(data: Quotation): void {
    const quotationDto: QuotationDto = {
      customer_name: data.customerName,
      student_name: data.studentName,
      date: data.date,
      school_grade: data.schoolGrade,
      school_name: data.schoolName,
      total_ammount: data.totalAmmount,
    }

    console.log(quotationDto)
  }
}

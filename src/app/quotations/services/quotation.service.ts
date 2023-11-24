import { Injectable } from '@angular/core';
import { Quotation, QuotationDto } from '../models/quotation';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor() {}

  private _mapperQuotation(source: Quotation): QuotationDto {
    return {
      customer_name: source.customerName,
      student_name: source.studentName,
      date: source.date,
      school_grade: source.schoolGrade,
      school_name: source.schoolName,
      total_ammount: source.totalAmmount,
    };
  }

  public async createQuotation(quotation: Quotation): Promise<void> {
    const quotationDto: QuotationDto = this._mapperQuotation(quotation);
  }
}

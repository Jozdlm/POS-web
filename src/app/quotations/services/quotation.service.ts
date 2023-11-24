import { Injectable, inject } from '@angular/core';
import { Quotation, QuotationDto } from '../models/quotation';
import { SupabaseService } from '@app/core/services/supabase.service';
import { QuotationItemDto } from '../models/quotation-item';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _supabase = this._supabaseService.supabase;

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

  private async _insertHeader(header: QuotationDto): Promise<any> {
    const { data, error } = await this._supabase
      .from('quotation_header')
      .insert(header)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }

  public async createQuotation(quotation: Quotation): Promise<void> {
    const quotationDto: QuotationDto = this._mapperQuotation(quotation);

    const insertedHeader = await this._insertHeader(quotationDto);
    const quotationId: number = insertedHeader.id;
  }
}

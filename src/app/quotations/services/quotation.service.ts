import { Injectable, inject } from '@angular/core';
import { Quotation, QuotationDto } from '../models/quotation';
import { SupabaseService } from '@app/core/services/supabase.service';
import { QuotationItem, QuotationItemDto } from '../models/quotation-item';
import { QuotationMapper } from '../mappers/quotation.mapper';
import { QuotationItemMapper } from '../mappers/quotation-item.mapper';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _supabase = this._supabaseService.supabase;

  constructor() {}

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

  private async _insertItems(items: QuotationItemDto[]): Promise<void> {
    const { error } = await this._supabase
      .from('quotation_items')
      .insert(items);

    if (error) {
      throw new Error(error.message);
    }
  }

  public async createQuotation(quotation: Quotation): Promise<void> {
    const quotationDto: QuotationDto = QuotationMapper.toDto(quotation);

    const insertedHeader = await this._insertHeader(quotationDto);
    const quotationId: number = insertedHeader.id;

    quotation.items = quotation.items ? quotation.items : [];

    const quotationItems: QuotationItemDto[] = quotation.items.map((item) =>
      QuotationItemMapper.toDto(item, quotationId),
    );

    await this._insertItems(quotationItems);
  }

  public async getQuotationItems(
    quotationId: number,
  ): Promise<QuotationItem[]> {
    let { data: quotation_items, error } = await this._supabase
      .from('quotation_items')
      .select('*, products(name)')
      .eq('quotation_id', quotationId);

    if (error) {
      throw new Error(error.message);
    }

    const items = quotation_items
      ? quotation_items.map((itemDto) => QuotationItemMapper.toEntity(itemDto))
      : [];

    return items;
  }

  public async getQuotations(): Promise<Quotation[]> {
    let { data: items, error } = await this._supabase
      .from('quotation_header')
      .select('*, school_grades(name)');

    if (error) {
      throw new Error(error.message);
    }

    const quotations = items
      ? items.map((item) => QuotationMapper.toEntity(item))
      : ([] as Quotation[]);

    return quotations;
  }

  // TODO: Get all the data related to quotation_header by foreign keys
  public async getQuotationById(
    quotationId: number,
  ): Promise<Quotation | null> {
    let { data: quotation_header, error } = await this._supabase
      .from('quotation_header')
      .select('*, school_grades(name)')
      .eq('id', quotationId);

    if (error) {
      throw new Error(error.message);
    }

    const quotation = quotation_header
      ? QuotationMapper.toEntity(quotation_header[0])
      : null;

    return quotation;
  }
}

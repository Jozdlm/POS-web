import { Injectable, inject } from '@angular/core';
import { Quotation, QuotationDto } from '../models/quotation';
import { SupabaseService } from '@app/common/services/supabase.service';
import { QuotationItem, QuotationItemDto } from '../models/quotation-item';
import { QuotationMapper } from '../mappers/quotation.mapper';
import { QuotationItemMapper } from '../mappers/quotation-item.mapper';
import { DbTables } from '@app/common/enums/db-tables';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  private async _insertHeader(header: QuotationDto): Promise<any> {
    const { data, error } = await this._db
      .from(DbTables.QUOTATIONS)
      .insert(header)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }

  private async _insertItems(items: QuotationItemDto[]): Promise<void> {
    const { error } = await this._db
      .from(DbTables.QUOTATION_ITEMS)
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
    let { data: quotation_items, error } = await this._db
      .from(DbTables.QUOTATION_ITEMS)
      .select(`*, ${DbTables.PRODUCTS}(name)`)
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
    let { data: items, error } = await this._db
      .from(DbTables.QUOTATIONS)
      .select(`*, ${DbTables.SCHOOL_GRADES}(name), ${DbTables.SCHOOLS}(name)`)
      .order('id', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const quotations = items
      ? items.map((item) => QuotationMapper.toEntity(item))
      : ([] as Quotation[]);

    return quotations;
  }

  public async getQuotationById(
    quotationId: number,
  ): Promise<Quotation | null> {
    let { data: quotation_header, error } = await this._db
      .from(DbTables.QUOTATIONS)
      .select(`*, ${DbTables.SCHOOL_GRADES}(name), ${DbTables.SCHOOLS}(name)`)
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

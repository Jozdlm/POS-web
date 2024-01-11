import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF, { jsPDFOptions } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfMakerService {
  private _pdfOptions: jsPDFOptions = {
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
    putOnlyUsedFonts: true,
    compress: true,
  };

  public generatePDF(element: HTMLElement, docName: string): void {
    const pdf = new jsPDF(this._pdfOptions);
    const scale = (596 - 18 * 2) / element.scrollWidth;

    pdf.html(element, {
      margin: 18,
      x: 7.086614173228346,
      html2canvas: {
        scale,
      },
      callback: (pdf: jsPDF) => {
        const totalPages = pdf.getNumberOfPages();
        const pagesToDelete = 9;

        for (let i = 0; i < pagesToDelete; i++) {
          pdf.deletePage(totalPages - i);
        }

        pdf.save(docName);
      },
    });
  }
}

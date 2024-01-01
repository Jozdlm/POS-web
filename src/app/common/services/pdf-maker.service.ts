import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF, { jsPDFOptions } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfMakerService {
  private _pdfOptions: jsPDFOptions = {
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
    putOnlyUsedFonts: true,
  };

  constructor() {}

  public generatePDF(element: HTMLElement, docName: string): void {
    const maker = new jsPDF(this._pdfOptions);
    const pdfWidth = 210;

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgElement = canvas.toDataURL('image/png');

      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      maker.addImage(imgElement, 'PNG', 10, 10, pdfWidth, pdfHeight);
      maker.html(element.innerHTML);
      maker.save(docName);
    });
  }
}

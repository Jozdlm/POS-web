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
    compress: true,
  };

  public readonly docWidth: number = 196;
  public readonly topMargin: number = 10;
  public readonly leftMargin: number = 10;

  public generatePDF(element: HTMLElement, docName: string): void {
    const maker = new jsPDF(this._pdfOptions);

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgElement = canvas.toDataURL('image/png');
      const pdfHeight = (canvas.height * this.docWidth) / canvas.width;

      maker.addImage(
        imgElement,
        'PNG',
        this.leftMargin,
        this.topMargin,
        this.docWidth,
        pdfHeight,
      );
      maker.html(element.innerHTML);
      maker.save(docName);
    });
  }
}

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

  public readonly docWidth: number = 594;
  public readonly topMargin: number = 24;
  public readonly leftMargin: number = 24;

  public generatePDF(element: HTMLElement, docName: string): void {
    const pdf = new jsPDF(this._pdfOptions);

    html2canvas(element, { scale: 1 }).then((canvas) => {
      const imgElement = canvas.toDataURL('image/png');
      const pdfHeight = (canvas.height * this.docWidth) / canvas.width;

      // pdf.addImage(
      //   imgElement,
      //   'PNG',
      //   this.leftMargin,
      //   this.topMargin,
      //   this.docWidth,
      //   pdfHeight,
      // );
      pdf.html(element, {
        callback: (pdf: jsPDF) => {
          pdf.save(docName);
        },
      });
    });
  }
}

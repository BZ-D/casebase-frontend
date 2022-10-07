import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const doc = new jsPDF('l', 'pt');

export const downloadReport = async () => {
  const charts = ['province-map-area', 'total-num-chart-area', 'total-fine-chart-area', 'organ-num-chart-area', 'organ-detail-num-chart-area', 'organ-detail-fine-chart-area'];

  for (let i = 0; i < charts.length; i++) {
    const res = await html2canvas(document.getElementsByClassName(charts[i])[0] as HTMLElement);
    const contentWidth = res.width;
    const contentHeight = res.height;
    const pageHeight = contentWidth * 592.28 / 841.89;
    const leftHeight = contentHeight;
    const position = 5;
    const imgWidth = 841.89;
    const imgHeight = 841.89 / contentWidth * contentHeight;
    createPDFObject(res.toDataURL('image/jpeg', 1.0), leftHeight, pageHeight, imgWidth, imgHeight, position, i !== charts.length - 1);
  }

  doc.save('report.pdf');
}

const createPDFObject = (imgData: any, leftHeight: any, pageHeight: any, imgWidth: any, imgHeight: any, position: any, ifAddPage: boolean) => {
  if (leftHeight < pageHeight) {
    doc.addImage(imgData, 'jpeg', 5, 0, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      doc.addImage(imgData, 'jpeg', 5, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= 592.28;
    } 
  }
  ifAddPage && doc.addPage();
}
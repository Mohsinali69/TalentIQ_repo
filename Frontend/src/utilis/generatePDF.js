import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function generatePDF() {
  const content = document.getElementById('pdf-content');
  html2canvas(content).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('download.pdf');
  });
}

export default generatePDF
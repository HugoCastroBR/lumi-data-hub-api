import path from "path";
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { IBill } from "./types/models";

async function readFileAsBuffer(filePath: string): Promise<Buffer> {
  try {
    const resolvedPath = path.resolve(filePath);
    const fileBuffer = await fs.readFile(resolvedPath);
    if((resolvedPath.split('.').pop() || '') !== 'pdf') {
      throw new Error('File is not a PDF');
    }
    return fileBuffer;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

 const monthToNumber = (month: string) => {
  switch (month) {
    case 'JAN':
      return 1;
    case 'FEV':
      return 2;
    case 'MAR':
      return 3;
    case 'ABR':
      return 4;
    case 'MAI':
      return 5;
    case 'JUN':
      return 6;
    case 'JUL':
      return 7;
    case 'AGO':
      return 8;
    case 'SET':
      return 9;
    case 'OUT':
      return 10;
    case 'NOV':
      return 11;
    case 'DEZ':
      return 12;
    default:
      return 0;
  }
};


async function extractDataFromPDF(pdfPath: string) {
  try {
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdf(dataBuffer);
    const formatData = data.text.split('\n').map((item: string) => item.replace(/\s+/g, ' ').trim());

    const findLineByKeyword = (keyword: string) => {
      return formatData.find((line: string) => line.toLowerCase().includes(keyword.toLowerCase())) || '';
    };

    const findNextLineByKeyword = (keyword: string, lines: number = 1) => {
      const index = formatData.findIndex((line: string) => line.toLowerCase().includes(keyword.toLowerCase()));
      return formatData[index + lines] || null;
    };

    const electricityLine = findLineByKeyword('Energia ElétricakWh');
    const sceeLine = findLineByKeyword('Energia SCEE s/ ICMSkWh');
    const compensatedLine = findLineByKeyword('Energia compensada GD IkWh');
    const publicContributionLine = findLineByKeyword('Contrib Ilum Publica Municipal');
    const clientNameLine = findNextLineByKeyword('Código de Débito ', 3); 
    const clientDetailsLine = findNextLineByKeyword('Nº DO CLIENTE');
    const billMonth = findNextLineByKeyword('Referente a Vencimento', 1);

    if (electricityLine && sceeLine && compensatedLine && publicContributionLine && clientDetailsLine) {
      const parseNumber = (str: string, idx: number, strict = false) => {
        if (strict) {
          return str.split(' ')[idx].replace('.', '').replace(',', '.')
        }
        return str.split(' ')[idx].replace(/\./g, '').replace(',', '.');
      };

      const electricity = Number(parseNumber(electricityLine, 2));
      const electricityCost = Number(parseNumber(electricityLine, 4));
      const scee = Number(parseNumber(sceeLine, 4).replace('.', ''));
      const sceeCost = Number(parseNumber(sceeLine, 6));
      const compensated = Number(parseNumber(compensatedLine, 4).replace('.', ''));
      const compensatedCost = Number(parseNumber(compensatedLine, 6, true));
      const publicContributionCost = Number(parseNumber(publicContributionLine, 4));
      const ucRegisterN = clientDetailsLine.split(' ')[1];
      const clientUcRegisterN = clientDetailsLine.split(' ')[0];

      // Isso parece errado, mas é o que está no PDF.
      let clientName = clientNameLine?.replace(/\d+/g, '').trim();
      if (clientName === 'ATENÇÃO:') {
        const NewClientNameLine = findNextLineByKeyword('Código de Débito ', 5);
        clientName = NewClientNameLine?.replace(/\d+/g, '').trim();
      }

      const BillFormattedData: IBill = {
        filename: pdfPath,
        month: monthToNumber(billMonth?.slice(0, 3)?.toString() || ''),
        year: Number(billMonth?.slice(4, 9)?.toString()),
        electricity,
        electricityCost,
        electricityScee: scee,
        electricitySceeCost: sceeCost,
        electricityCompensated: compensated,
        electricityCompensatedCost: compensatedCost,
        electricityPublicCost: publicContributionCost,
        uc: {
          registerN: ucRegisterN,
          client: {
            name: clientName || '',
            registerN: clientUcRegisterN
          }
        }
      };

      return BillFormattedData;
    } else {
      throw new Error('PDF READING');
    }
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
}



export { readFileAsBuffer, extractDataFromPDF,monthToNumber };



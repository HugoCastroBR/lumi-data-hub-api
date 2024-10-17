import path from "path";
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { IBill } from "./types/models";

async function readFileAsBuffer(filePath: string): Promise<Buffer> {
  try {
      const resolvedPath = path.resolve(filePath);
      
      const fileBuffer = await fs.readFile(resolvedPath);
      
      return fileBuffer;
  } catch (error) {
      console.error('Error reading file:', error);
      throw error; 
  }
}

async function extractDataFromPDF(pdfPath: string) {
    try {
        const dataBuffer = await fs.readFile(pdfPath);
        const data = await pdf(dataBuffer);
        const formatData = data.text.split('\n').map((item: string) => {
          return item.replace(/\s+/g, ' ').trim();
        })

        const relevantBillData = [
          formatData[5],
          formatData[6],
          formatData[7],
          formatData[8],
          formatData[32], 
          formatData[39],
          formatData[41],           
        ]
        console.log(Number(relevantBillData[1].split(' ')[5].replace(',','.')))

        const BillFormattedData:Partial<IBill> = {
          electricity: Number(relevantBillData[0].split(' ')[2].replace(',','.')),
          electricityCost: Number(relevantBillData[0].split(' ')[4].replace(',','.')),
          electricityScee: Number(relevantBillData[1].split(' ')[4].replace(',','.')),
          electricitySceeCost: Number(relevantBillData[1].split(' ')[6].replace(',','.')),
          electricityCompensated: Number(relevantBillData[2].split(' ')[4].replace(',','.')),
          electricityCompensatedCost: Number(relevantBillData[2].split(' ')[6].replace(',','.')),
          electricityPublicCost: Number(relevantBillData[3].split(' ')[4].replace(',','.')),
          uc:{
            registerN: relevantBillData[5].split(' ')[1],
            client: {
              name: relevantBillData[4].replace(/\d+/g, '').trim(),
              registerN: relevantBillData[5].split(' ')[0]
            }
          }
          
        }

        return BillFormattedData;
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
}





export { readFileAsBuffer,extractDataFromPDF };


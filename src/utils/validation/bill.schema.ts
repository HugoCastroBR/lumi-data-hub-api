import { IsInt, IsNotEmpty, IsOptional, Min, IsDecimal, IsString } from "class-validator";
import { PartialBill } from "../types/models"; 

export class CreateBillValidationSchema implements PartialBill {
  
  @IsInt()
  @Min(1)
  month!: number;

  @IsInt()
  @Min(2000) 
  year!: number;

  @IsString()
  @IsOptional()
  filename!:string

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricity!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricityCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricityScee!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricitySceeCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricityCompensated!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricityCompensatedCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  electricityPublicCost!: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  ucId!: number;  
}

export class UpdateBillValidationSchema extends CreateBillValidationSchema {
  
  @IsInt()
  @Min(1)
  @IsOptional()
  month!: number;

  @IsInt()
  @Min(2000)
  @IsOptional()
  year!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricity!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricityCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricityScee!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricitySceeCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricityCompensated!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricityCompensatedCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsOptional()
  electricityPublicCost!: number;
}

export class GetBillIdValidationSchema implements PartialBill {
  
  @IsInt()
  @Min(1)
  id!: number;
}

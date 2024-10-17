import { IsInt, IsNotEmpty, IsOptional, Min, IsDecimal } from "class-validator";
import { PartialBill } from "../types/models"; // Adjust the import path as needed

export class CreateBillValidationSchema implements PartialBill {
  
  @IsInt()
  @Min(1)
  month!: number;

  @IsInt()
  @Min(2000) // Assuming the year should be at least 2000
  year!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricity!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricityCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricityScee!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricitySceeCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricityCompensated!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricityCompensatedCost!: number;

  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Must be a decimal number' })
  @IsNotEmpty()
  electricityPublicCost!: number;

  @IsInt()
  @Min(1)
  ucId!: number; // Assuming ucId is required for creating a bill
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

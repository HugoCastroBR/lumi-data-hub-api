import { IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { PartialUC } from "../types/models"; 

export class CreateUCValidationSchema implements PartialUC {
  @Length(8, 12)
  @IsNotEmpty()
  registerN!: string; 
}


export class UpdateUCValidationSchema extends CreateUCValidationSchema {
  @Length(8,12)
  @IsOptional()
  registerN!: string;
}


export class GetUCIdValidationSchema implements PartialUC {
  @IsInt()
  @Min(0)
  id!: number; 
}

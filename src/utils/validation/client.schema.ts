import { IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { PartialClient } from "../types/models";

export class CreateClientValidationSchema implements PartialClient {

  @Length(0, 200)
  @IsNotEmpty()
  name!: string;

  @Length(8,12)
  @IsNotEmpty()
  registerN!: string;
}

export class UpdateClientValidationSchema extends CreateClientValidationSchema {
  @Length(0, 200)
  @IsOptional()
  name!: string;

  @Length(8,12)
  @IsOptional()
  registerN!: string;
}

export class GetProductIdValidationSchema implements PartialClient {
  @IsInt()
  @Min(0)
  id!:number
}
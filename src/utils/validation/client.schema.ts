import { IsNotEmpty, IsNumber, Min,Max } from "class-validator";
import { IClient, PartialClient } from "../types/models";

export class CreateClient implements PartialClient {
  
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsNumber({}, { message: 'ID must be a valid number' })
  @Min(0, { message: 'ID must be greater than 0' })
  @Max(999999999999)
  id!: number;
}
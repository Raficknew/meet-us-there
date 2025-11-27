import { IsNotEmpty, IsString } from "class-validator";

export class CreateGroupRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  description?: string;
}

import { IsArray } from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enum';
import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [String], { nullable: true })
  @IsArray()
  roles: ValidRoles[] = [];
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });

import { PartialType } from '@nestjs/mapped-types';
import { CreateMonographicDto } from './create-monographic.dto';

export class UpdateMonographicDto extends PartialType(CreateMonographicDto) {}

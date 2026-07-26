import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDto } from './src/auth/dto/register.dto';

async function main() {
  const payload = { email: 'test@example.com', password: '123456', name: undefined };
  const dto = plainToInstance(RegisterDto, payload);
  const errors = await validate(dto, { whitelist: true, forbidUnknownValues: true });
  console.log(JSON.stringify({ payload, dto, errors }, null, 2));
}

main();

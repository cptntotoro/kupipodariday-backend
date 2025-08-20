import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Пример контроллера:

// @Post()
// @Roles(['admin']) // посты могут создавать только пользователи с ролью admin
// create() {
//   return 'This action will create a post';
// }
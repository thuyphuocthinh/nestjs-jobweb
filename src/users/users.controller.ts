import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post("/create")
  // create(
  //   @Body("email") email: string,
  //   @Body("password") password: string,
  //   @Body("name") name: string) {
  //   // @Body ~ request.body
  //   return this.usersService.create(email, password, name);
  // }

  @Post("/create")
  create(@Body() createUserDto: CreateUserDto) {
    // @Body ~ request.body
    return this.usersService.create(createUserDto);
  }

  @Get("/getAll")
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/getById/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/updateById')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete('/deleteById/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

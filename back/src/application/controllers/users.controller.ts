import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserRequestDTO, LoginUserDTO, LoginResponseDTO, GetUserResponseDTO } from '../../core/dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserRequestDTO) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: LoginResponseDTO })
  login(@Body() creds: LoginUserDTO) {
    return this.usersService.login(creds);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Body() id: number) {
    return this.usersService.logout(id);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get the current user' })
  @ApiBody({ type: String })
  @ApiResponse({ type: GetUserResponseDTO })
  me(@Body() token: string) {
    return this.usersService.getUser(token);
  }
  
  @ApiOperation({ summary: 'Delete all users' }) 
  @ApiResponse({ status: 200, description: 'All users deleted successfully' })
  @Delete()
  wipe() {
    return this.usersService.deleteAllUsers();
  }

  @ApiOperation({ summary: 'Delete a user' }) 
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

    // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}

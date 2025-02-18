import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/hello')
  @ApiOperation({ summary: 'Get a hello world' })
  @ApiResponse({ status: 200, description: 'Hello world' })
  getHello(): string {
    return this.appService.getHello();
  }
}

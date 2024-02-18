import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test-app')
export class AppController {
  constructor(private readonly appService: AppService) {

  }
  @Get()
  async hello( ) {
    return 'Liste des comptes utilisateurs obtenue avec succès'
  }
}

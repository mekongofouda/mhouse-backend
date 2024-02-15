import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListServiceDto } from './dto/list-service.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = {
  storage: diskStorage({
    destination: '.uploads/profile-images',
    filename: (req, file, cb) => {
      const filename: string = file.originalname;
      cb(null, (`${filename}`));
    }
  })
}

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addService(
    @Body(ReferencePipe) addServiceDto: AddServiceDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.addService(addServiceDto, account);
    return {
      data: data,
      message: 'Service créé avec succès',
      code: HttpStatus.OK,
    };
  }

  @Post('upload/service/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadPostImage(
    @UploadedFile() file, 
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.uploadServiceImage(account, file);
    return {
      data: data,
      message: 'Service image uploaded successufully',
      code: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listService(
    @Query() listServiceDto: ListServiceDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.listService(listServiceDto, account);
    return {
      data: data,
      message: 'Liste de services affichée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showServiceDetail(
    @Param('ref') ref: string,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.showServiceDetail(ref, account);
    return {
      data: data,
      message: 'Détails du service affiché avec succès',
      code: HttpStatus.OK,
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateService(
    @Param('ref') ref: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.updateService(
      ref,
      updateServiceDto,
      account,
    );
    return {
      data: data,
      message: 'Service supprimé avec succès',
      code: HttpStatus.OK,
    };
  }

  @Delete(':ref')
  async deleteService(
    @Param('ref') ref: string,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.deleteService(ref, account);
    return {
      data: data,
      message: 'Service supprimé avec succès',
      code: HttpStatus.OK,
    };
  }
}

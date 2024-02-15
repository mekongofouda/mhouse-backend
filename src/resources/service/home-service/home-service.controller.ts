import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HomeServiceService } from './home-service.service';
import { AddHomeServiceDto } from './dto/add-home-service.dto';
import { UpdateHomeServiceDto } from './dto/update-home-service.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Account } from 'src/decorators/account.decorator';
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
@Controller('home-service')
export class HomeServiceController {
  constructor(private readonly homeServiceService: HomeServiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeService(
    @Body(ReferencePipe) createHomeServiceDto: AddHomeServiceDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeServiceService.addHomeService(
      createHomeServiceDto,
      account,
    );
    return {
      data: data,
      message: 'Homecare ajouté avec succès',
      code: HttpStatus.OK,
    };
  }

  @Post('upload/home-service/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadPostImage(
    @UploadedFile() file, 
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeServiceService.uploadHomeServiceImage(account, file);
    return {
      data: data,
      message: 'Profile image uploaded successufully',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHomeServiceDetail(
    @Param('ref') ref: string,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeServiceService.showHomeServiceDetail(ref, account);
    return {
      data: data,
      message: 'Partage effectué avec succès',
      code: HttpStatus.OK,
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateService(
    @Param('ref') ref: string,
    @Body() updateHomeServiceDto: UpdateHomeServiceDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeServiceService.updateHomeService(
      ref,
      updateHomeServiceDto,
      account,
    );
    return {
      data: data,
      message: 'Homecare mise à jour avec succès',
      code: HttpStatus.OK,
    };
  }
}

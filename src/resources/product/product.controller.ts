import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
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
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addProduct(
    @Body(ReferencePipe) addProductDto: AddProductDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.productService.addProduct(addProductDto, account);
    return {
      data: data,
      message: 'Produit ajouté avec succès',
      code: HttpStatus.OK,
    };
  }

  @Post('upload/product/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadPostImage(
    @UploadedFile() file, 
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.productService.uploadProductImage(account, file);
    return {
      data: data,
      message: 'Product image uploaded successufully',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showProductDetail(
    @Param('ref') ref: string,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.productService.showProductDetail(ref, account);
    return {
      data: data,
      message: 'Partage effectué avec succès',
      code: HttpStatus.OK,
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('ref') ref: string,
    @Body() updateProductDto: UpdateProductDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.productService.updateProduct(
      ref,
      updateProductDto,
      account,
    );
    return {
      data: data,
      message: 'Hotel booking mis à jour avec succès',
      code: HttpStatus.OK,
    };
  }
}

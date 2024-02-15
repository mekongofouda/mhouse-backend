import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Service } from '../service/entities/service.entity';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class ProductService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async addProduct(addProductDto: AddProductDto, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_PRODUCT) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }
    const product = await this.productRepository.create(addProductDto);
    if (product == null) {
      throw new BadRequestException('Product not found');
    }

    try {
      await this.productRepository.save(product);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return product;
  }

  async uploadProductImage(account, file) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPLOAD_POST_IMAGE) !=
        false
      ) {
        throw new UnauthorizedException("Vous n'avez pas les privilèges requis");
      }
    }
    userAccount.avatar = file;
    console.log(userAccount);

    //Persist account
    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail); 
    }

    return userAccount;
  }

  async showProductDetail(refProduct: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_PRODUCT) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const product = await this.productRepository.findOneBy({
      refProduct,
    });
    if (product == null) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async updateProduct(
    refProduct: string,
    updateProductDto: UpdateProductDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_PRODUCT) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const productService = await this.productRepository.findOneBy({
      refProduct,
    });
    if (productService == null) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(productService, updateProductDto);

    try {
      await this.productRepository.save(productService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return productService;
  }
}

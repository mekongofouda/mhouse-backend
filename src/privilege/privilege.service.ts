import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { Repository } from 'typeorm';
import { ListPrivilegeDto } from './dto/list-privilege.dto';

@Injectable()
export class PrivilegeService {

  constructor(
    @InjectRepository(Privilege) 
    private readonly privilegeRepository: Repository<Privilege>
  ){}

  async addPrivilege(addPrivilegeDto) {

    const privilege = this.privilegeRepository.create(addPrivilegeDto);    
    return await this.privilegeRepository.save(privilege);
  }

  async listPrivilege(listPrivilegeDto: ListPrivilegeDto): Promise<Privilege[]> {
    return await this.privilegeRepository.find();
  }

  showPrivilegeDetail(refPrivilege: string): Promise<Privilege | null> {
    return this.privilegeRepository.findOneBy({refPrivilege});
  }

  async updatePrivilege(refPrivilege: string, updatePrivilegeDto): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOne({where:{refPrivilege}});
    Object.assign(privilege, updatePrivilegeDto);
    return await this.privilegeRepository.save(privilege);
  }

  async deletePrivilege(refPrivilege: string): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOneBy({refPrivilege});
    return await this.privilegeRepository.remove(privilege);
  }
}

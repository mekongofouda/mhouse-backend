import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrivilegeService {

  constructor(
    @InjectRepository(Privilege) 
    private readonly privilegeRepository: Repository<Privilege>
  ){}

  async addPrivilege(addPrivilegeDto) {

    addPrivilegeDto.createdAt = Date.now().toString();
    addPrivilegeDto.updatedAt = Date.now().toString();

    const privilege = this.privilegeRepository.create(addPrivilegeDto);
    console.log(privilege);
    
    return await this.privilegeRepository.save(privilege);
  }

  listPrivilege(): Promise<Privilege[]> {
    return this.privilegeRepository.find();
  }

  showPrivilegeDetail(reference: string): Promise<Privilege | null> {
    return this.privilegeRepository.findOneBy({reference});
  }

  async updatePrivilege(reference: string, updatePrivilegeDto): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOne({where:{reference}});
    Object.assign(privilege, updatePrivilegeDto);
    return await this.privilegeRepository.save(privilege);
  }

  async deletePrivilege(reference: string): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOneBy({reference});
    return await this.privilegeRepository.remove(privilege);
  }
}

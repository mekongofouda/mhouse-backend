import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SponsorService {

  constructor(
    @InjectRepository(Sponsor) 
    private readonly sponsorRepository: Repository<Sponsor>
  ){}

  async sponsor(sponsorDto: SponsorDto): Promise<Sponsor> {
    return await this.sponsorRepository.save(sponsorDto);
  }

  async listSponsor(listSponsorDto: ListSponsorDto) {
    const refUser = listSponsorDto.refUser;
    const refPost = listSponsorDto.refPost;
    const createdAt = listSponsorDto.createdAt;
    const updatedAt = listSponsorDto.updatedAt;

    const qb = this.sponsorRepository.createQueryBuilder("sponsor");

    qb.select("sponsor")
    if (refUser) {
      qb.where("sponsor.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (refPost) {
      qb.andWhere("sponsor.refRole = :refRole")
      .setParameters({
        refPost
      })
    }
    if (createdAt) {
      qb.where("sponsor.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("sponsor.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showSponsorDetail(refSponsor: string) {
    const sponsor = await this.sponsorRepository.findOne({where:{refSponsor}});
    if (sponsor == null) {
      throw new HttpException("Sponsor not found", HttpStatus.NOT_FOUND)
    }    
    return sponsor;
  }
}

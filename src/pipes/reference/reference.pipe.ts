import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReferencePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) { 

    if (metadata.metatype.name == 'RegisterDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refAccount = "RACC"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddDiscussionDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refDiscussion = "RDCS"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'LikeDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refLike = "RLIK"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'SendMessageDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refMessage = "RMSG"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
 
    if (metadata.metatype.name == 'SendNotificationDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refNotification = "RNTF"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'OfferDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refOffer = "ROFR"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'PostDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refPost = "RPST"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddPrivilegeDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refPrivilege = "RPRV"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddRoleDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRole = "RROL"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddServiceDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refService = "RSRV"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'ShareDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refShare = "RSHR"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'SponsorDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refSponsor = "RSPS"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddRealEstateDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddHomeCereDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
    if (metadata.metatype.name == 'AddHomeStandingDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
    if (metadata.metatype.name == 'AddHotelBookingDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
    if (metadata.metatype.name == 'AddRealEstateRealisationDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
    if (metadata.metatype.name == 'AddHomeCareRealisationDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRealEstate = "RRES"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
    return value; 
  }
}
 
import { OmitType } from "@nestjs/mapped-types";
import { OfferDto } from "./offer.dto";

export class UpdateOfferDto extends OmitType(OfferDto, ['refPost']) {}

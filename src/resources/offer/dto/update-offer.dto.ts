import { PartialType } from "@nestjs/mapped-types";
import { OfferDto } from "./offer.dto";

export class UpdateOfferDto extends PartialType(OfferDto) {}

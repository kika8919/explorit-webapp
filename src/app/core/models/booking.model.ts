import { IHotel } from './hotel.model';

export interface IBooking {
  _id?: string;
  hotel: string;
  userEmail: string;
  contactPhoneNumber: string;
  dates: { start: string; end: string };
  noOfPeople: number;
  pricePerNightAtBooking: string;
  totalCost: string;
  contactEmail?: string | null;
  populatedHotel?: IHotel;
}

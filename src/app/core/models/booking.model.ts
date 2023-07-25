export interface IBooking {
  _id?: string;
  hotel: string;
  userEmail: string;
  contactPhoneNumber: string;
  dates: Object;
  noOfPeople: number;
  pricePerNightAtBooking: string;
  totalCost: string;
  contactEmail?: string | null;
}

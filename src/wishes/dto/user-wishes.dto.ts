export class UserWishesDto {
    id: number;
    name: string;
    description: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    offers: Offer[];
    createdAt: string; // date-time
    updatedAt: string; // date-time
}
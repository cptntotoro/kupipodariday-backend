import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

export class Offer {
  id: number;
  createdAt: string; // format: date-time
  updatedAt: string; // format: date-time
  item: Wish;
  amount: number;
  hidden: boolean;
  user: User;
}

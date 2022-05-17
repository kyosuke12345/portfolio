import { Request } from 'express';
import { User } from 'libs/lib/src/database/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
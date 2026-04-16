import { DBRepository } from "../../d.repository.js";
import { User } from "./user.model.js";
class UserRepository extends DBRepository {
  constructor() {
    super(User);
  }
}

export const Userrepository = new UserRepository();

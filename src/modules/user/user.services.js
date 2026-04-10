import { Userrepository } from "../../DataBase/index.js";

export const checkUserExist = async (filter) => {
  return await Userrepository.getOne(filter);
};

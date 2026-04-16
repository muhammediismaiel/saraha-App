import { Userrepository } from "../../DataBase/index.js";

export const checkUserExist = async (filter) => {
  return await Userrepository.getOne(filter);
};

export const creatUser = async (userdata) => {
  return await Userrepository.creat(userdata);
};

export const getProfile = async (filter) => {
  return await Userrepository.getOne(filter);
};

export const updateProfile = async (filter, data) => {
  return await Userrepository.update(filter, data, { new: true });
};

export const deleteProfile = async (filter) => {
  return await Userrepository.delete(filter);
};

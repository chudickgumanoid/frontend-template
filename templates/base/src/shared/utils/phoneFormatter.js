import { Mask } from "maska";

export const phoneMaska = (phone) => {
  const maska = new Mask({ mask: "+# ### ### ## ##" });

  return maska.masked(phone || "");
};

export const clearPhone = (phone) => {
  return phone.replace(/\D/g, "");
};

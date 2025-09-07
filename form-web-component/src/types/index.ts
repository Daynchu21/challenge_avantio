export type Accommodation = {
  name: string;
  address: string;
  description: string;
  type: string;
  photos: string[];
};

export type Owner = {
  name: string;
  email: string;
  phone: string;
};

export const initialAccommodation: Accommodation = {
  name: "",
  address: "",
  description: "",
  type: "",
  photos: [],
};

export const initialOwner: Owner = {
  name: "",
  email: "",
  phone: "",
};

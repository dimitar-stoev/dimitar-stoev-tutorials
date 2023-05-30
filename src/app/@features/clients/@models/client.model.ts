export interface Client {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: Address[];
  note: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

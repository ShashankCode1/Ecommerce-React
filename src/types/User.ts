export interface User {
  userId: string;
  userName: string;
  email: string;
  phoneNo: string;
  addressList: Address[];
}

export interface Address {
  addressId: string;
  doorNo: string;
  street: string;
  city: string;
}

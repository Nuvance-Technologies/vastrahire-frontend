import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    role: string;
    phoneNumber?: string;
    address?: string;
  }

  interface Session {
    user: {
      id: string;
      name: {
        firstname: string;
        lastname: string;
      };
      email: string;
      role: string;
      jwt: string;
      phoneNumber?: string;
      address?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    role: string;
    jwt: string;
    phoneNumber?: string;
    address?: string;
  }
}

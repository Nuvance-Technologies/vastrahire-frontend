export interface AuthorizedUser {
  id: string;
  name: { firstname: string; lastname: string };
  email: string;
  role: "individual" | "business" | "customer";
  phoneNumber?: string;
  address?: string;
  companyName?: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
  };
  brandBio?: string;
}

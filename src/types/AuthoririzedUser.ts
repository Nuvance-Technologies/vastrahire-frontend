export interface AuthorizedUser {
  id: string;
  name: { firstname: string; lastname: string };
  email: string;
  role: "individual" | "business" | "customer";
  phoneNumber: string;
  businessType:
    | "individual_seller"
    | "boutique_store"
    | "fashion_designer"
    | "rental_business"
    | "others"
    | undefined;
}

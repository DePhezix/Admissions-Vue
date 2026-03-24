export interface carouselItem {
  img: string;
  text1: string;
  text2: string;
  speaker: string;
  speakerPosition: string;
}

export interface formType {
  email?: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

export interface signUpFormType {
  userType: string;
  location: string;
}

export interface TypeForm {
  userType: "local" | "foreign";
  location: string;
}

export interface CredForm {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactForm {
  name: string;
  surname: string;
  passport: string;
}

export type Direction =
  | "Pre-foundation"
  | "Bachelors"
  | "Masters"
  | "Transfer"
  | "";

export type Faculty =
  | "Medicine school"
  | "Dental school"
  | "Hospitality & Tourism school"
  | "Engineering School"
  | "Applied Intelligence School"
  | '';

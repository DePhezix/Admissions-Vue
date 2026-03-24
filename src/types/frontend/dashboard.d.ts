import type { UploadFile } from "element-plus";
import type { Component } from "vue";

export type examSubmissionType = "" | "certificate" | "exam"

export interface NavMenuItem {
    name: string,
    icon: Component;
}

export interface PersonalInfoForm {
  name: string;
  surname: string;
  dob: Date | null;
  email: string;
  gender: 'male'| 'female'| "";
  passport: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  house: string;
  motherPhone: string;
  fatherPhone: string;
  passportFront: UploadFile | null;
  passportBack: UploadFile | null;
  diploma: UploadFile | null;
  otherDocs: UploadFile | null;
};

export interface Invoice {
  name: string,
  date: string,
  amount: number,
}
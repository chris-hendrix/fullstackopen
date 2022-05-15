import patients from "../../data/patients";
import { Patient, PublicPatient } from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (patientId: string): Patient | undefined => {
  return patients.find((p: Patient) => p.id === patientId);
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(p => ({...p, ssn: undefined}));
};

const addPatient = (patient: Patient): PublicPatient => {
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addPatient
};
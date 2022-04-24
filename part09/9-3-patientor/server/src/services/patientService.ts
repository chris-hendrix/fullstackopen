import patients from "../../data/patients";
import { Patient, SafePatient } from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getSafePatients = (): Array<SafePatient> => {
  return patients.map(p => ({...p, ssn: undefined}));
};

const addPatient = (patient: Patient): SafePatient => {
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getSafePatients,
  addPatient
};
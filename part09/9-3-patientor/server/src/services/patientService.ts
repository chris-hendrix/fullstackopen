import patients from "../../data/patients";
import { Patient, PublicPatient, Entry } from "../types";

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

const addEntry = (patient: Patient, entry: Entry): Entry => {
  if(!Array.isArray(patient.entries)) patient.entries = [];
  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addPatient,
  addEntry
};
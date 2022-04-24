import patients from "../../data/patients";
import { Patient, PatientEntry } from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientEntries =  (): Array<PatientEntry> => {
  return patients.map(p => ({...p, ssn: undefined}));
};

export default {
  getPatients,
  getPatientEntries
};
import { v1 as uuid } from 'uuid';
import { Patient, Gender, Entry, Diagnosis, HealthCheckRating, Discharge, SickLeave } from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) throw new Error('Incorrect or missing field');
  return text;
};

const isDate = (param: string): boolean => Boolean(Date.parse(param));

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return new Date(date);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodes = (param: any): param is Array<Diagnosis["code"]> => {
  if (!Array.isArray(param)) return false;
  if (!param.every((code: unknown) => isString(code))) return false;
  return true;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes) return [];
  if (!isDiagnosisCodes(diagnosisCodes)) throw new Error("Incorrect diagnosis codes format");
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ( !isHealthCheckRating(rating)) throw new Error("Incorrect or missing health check rating");
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!param) return false;
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  if (!Object.keys(param).includes('date') || !Object.keys(param).includes('criteria')) return false;
  if (!isDate(param.date)) return false;
  if (!isString(param.date)) return false;
  /* eslint-enable @typescript-eslint/no-unsafe-argument */
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) throw new Error("Incorrect or missing discharge data");
  const date = parseDate(discharge.date);
  const criteria = parseString(discharge.criteria);
  return { date, criteria };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if (!param) return false;
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  if (!Object.keys(param).includes('startDate') || !Object.keys(param).includes('endDate')) return false;
  if (!isDate(param.startDate)) return false;
  if (!isString(param.endDate)) return false;
  /* eslint-enable @typescript-eslint/no-unsafe-argument */
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) throw new Error("Incorrect or missing sick leave data");
  const startDate = parseDate(sickLeave.startDate);
  const endDate = parseDate(sickLeave.endDate);
  return { startDate, endDate };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const createdEntry: Entry | null = createEntry(param);
    return Boolean(createdEntry);
  } catch (err) {
    return false;
  }
};

type EntryFields = { id: unknown, type: unknown, description : unknown, date: unknown, specialist: unknown, 
  diagnosisCodes?: unknown, healthCheckRating?: unknown, discharge?: unknown, employerName?: unknown, sickLeave?: unknown };

export const createEntry = ({ id, type, description, date, specialist, diagnosisCodes, 
  healthCheckRating, discharge, employerName, sickLeave}: EntryFields): Entry | null => {
  const baseEntry = {
    id: id ? parseString(id) : uuid(),
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };

  switch (type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: type,
        discharge: discharge ? parseDischarge(discharge) : undefined,
      };
    case "HealthCheck":
      return {
        ...baseEntry,
        type: type,
        healthCheckRating: parseHealthCheckRating(
          healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: type,
        employerName: parseString(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
      };
  }
  return null;
};

type PatientFields = { id: unknown, name: unknown, dateOfBirth: unknown, 
  ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const createPatient = (
    {id, name, dateOfBirth, ssn, gender, occupation, entries}: PatientFields
  ): Patient => {
  const patientEntries: Entry[] = [];
  if(Array.isArray(entries)) {
    entries.forEach((e: Entry) => {
      if (isEntry(e)) {patientEntries.push(e);}
    });
  }

  const patient: Patient = {
    id: id ? parseString(id) : uuid(),
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: patientEntries
  };
  return patient;
};
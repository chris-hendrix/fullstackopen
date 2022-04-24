export type Gender = 'male' | 'female' | 'other';

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: Date,
  ssn: string,
  gender: Gender
}

export type PatientEntry = Omit<Patient, 'ssn'>;
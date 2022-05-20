import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {patientId: string, entry: Entry};
    };
  

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
        case "ADD_ENTRY": 
          const patient: Patient = state.patients[action.payload.patientId];
          const entries: Entry[] = [...patient.entries || [], action.payload.entry];
          patient.entries = entries;
          return {
            ...state,
            patients: {
              ...state.patients,
              [action.payload.patientId]: patient
            }
          };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi 
  };
};

export const setDiagnosisList = (diagnosesFromApi: Diagnosis[]): Action => {
  return { 
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnosesFromApi 
  };
};

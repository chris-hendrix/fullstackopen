
import { Patient, Entry, Diagnosis } from '../types';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@material-ui/core";

import {
  Male,
  Female,
  LocalHospital,
  MedicalServices,
  CheckBox,
  Favorite
} from '@mui/icons-material';

const genderIconMap: { [key: string]: JSX.Element | null } = {
  "male": <Male />,
  "female": <Female />,
  "other": null
};

const entryIconMap: { [key: string]: JSX.Element } = {
  'Hospital': <LocalHospital />,
  'OccupationalHealthcare': <MedicalServices />,
  'HealthCheck': <CheckBox />
};

const healthCheckColorMap: { [key: number]: "success" | "info" | "warning" | "error" | "inherit" | "disabled" | "action" | "primary" | "secondary" | undefined } = {
  0: 'success',
  1: 'info',
  2: 'warning',
  3: 'error'
};

const DiagnosisDetails = ({code}: {code: string}) => {
  const [{ diagnoses }] = useStateValue();
  const name: string = code in diagnoses ? diagnoses[code].name : 'no name available';
  return (
    <li key={code}>{`${code} - ${name}`}</li>
  );
};

const EntryDetails = ({entry}: {entry: Entry}) => {
  const codes: Array<Diagnosis['code']> = entry.diagnosisCodes ? entry.diagnosisCodes : [];
  return (
    <Box key={entry.id} style={{margin: '4px', padding: '4px', borderRadius: '4px', border: '1px solid black'}}>
      <Typography>{entry.date} {entryIconMap[entry.type]} {entry.employerName || ''}</Typography>
      <Typography>{entry.description}</Typography>
      {entry.healthCheckRating !== undefined && (<Favorite color={healthCheckColorMap[entry.healthCheckRating]} />)}
      {codes && codes.length > 0 && (
        <Typography>
          {codes.map((c: Diagnosis['code']) => <DiagnosisDetails key={c} code={c} />)}
        </Typography>
      )}
    <Typography>{`diagnosed by ${entry.specialist}`}</Typography>
    </Box>
  );
};

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient | null = id ? patients[id] : null;
  const entries: Entry[] = patient && patient.entries ? patient.entries : [];

  return (
    <>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient?.name} {genderIconMap[patient?.gender || 'other']}
      </Typography>
      <Typography variant="body1" style={{ marginTop: "0.5em" }}>
        {`ssn: ${patient?.ssn || ''}`}
        <br/>
        {`occupation: ${patient?.occupation || ''}`}
      </Typography>
      <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        Entries
      </Typography>
      <Box style={{ marginTop: "0.5em" }}>
        {entries.map((e: Entry) => <EntryDetails key={e.id} entry={e} />)}
      </Box>
    </>

  );
};

export default PatientPage;

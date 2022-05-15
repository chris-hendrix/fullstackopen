
import { Patient, Entry, Diagnosis } from '../types';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@material-ui/core";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const genderIconMap = {
  "male": <MaleIcon />,
  "female": <FemaleIcon />,
  "other": null
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
      <Typography variant="body1" style={{ marginTop: "0.5em" }}>
        {entries.map((e: Entry) => {
          const codes: Array<Diagnosis['code']> = e.diagnosisCodes ? e.diagnosisCodes : [];
          return (
            <>
              <Box key={e.id}>{`${e.date} - ${e.description}`}</Box>
              {codes.map((c: Diagnosis['code']) => <li key={c}>{c}</li>)}
            </>
          );
        })}
      </Typography>
    </>

  );
};

export default PatientPage;

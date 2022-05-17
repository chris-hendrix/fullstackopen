
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
  const [{ patients, diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient | null = id ? patients[id] : null;
  const entries: Entry[] = patient && patient.entries ? patient.entries : [];

  const renderDiagnosis = (code: string): JSX.Element => {
    const name: string = code in diagnoses ? diagnoses[code].name : 'no name available';
    return (
      <li key={code}>{`${code} - ${name}`}</li>
    );
  };

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
        {entries.map((e: Entry) => {
          const codes: Array<Diagnosis['code']> = e.diagnosisCodes ? e.diagnosisCodes : [];
          return (
            <Box key={e.id}>
              <Typography>
                {`${e.date} - ${e.description}`}
                {codes.map((c: Diagnosis['code']) => renderDiagnosis(c))}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>

  );
};

export default PatientPage;

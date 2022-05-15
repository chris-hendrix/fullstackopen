
import { Patient } from '../types';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { Typography } from "@material-ui/core";

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

  return (
    <>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient?.name} {genderIconMap[patient?.gender || 'other']}
      </Typography>
      <Typography variant="body1" style={{ marginTop: "0.5em" }}>
        {`date of birth: ${patient?.dateOfBirth || ''}`}
        <br/>
        {`occupation: ${patient?.occupation || ''}`}
      </Typography>
    </>

  );
};

export default PatientPage;

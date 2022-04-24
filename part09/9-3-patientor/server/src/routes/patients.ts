import express from 'express';
import patientService from '../services/patientService';
import createPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSafePatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const patient = createPatient(req.body);
    const addedPatient = patientService.addPatient(patient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
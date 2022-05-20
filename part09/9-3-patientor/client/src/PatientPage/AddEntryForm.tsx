import React from "react";
import { useStateValue } from "../state";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { 
  TextField, 
  EntryTypeSelectField, 
  DiagnosisSelection, 
  EntryTypeOption,
  NumberField
} from "../AddPatientModal/FormField";
import { Entry, EntryType } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        date: '',
        description: '',
        specialist: '',
        employerName: '',
        healthCheckRating: 0,
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.date && !Date.parse(values.date)) {
          errors.date = 'Invalid date';
        }
        if (values.type === EntryType.OccupationalHealthcare && !values.employerName ) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <EntryTypeSelectField label="Entry type*" name="type" options={entryTypeOptions} />
          <Field
            label="Date*"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Description*"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist*"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Health check rating"
            name="healthCheckRating"
            min={0}
            max={3}
            component={NumberField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;
import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as z from 'zod';
import { SchoolYear, NON_EMPTY_ERR_MSG, majors, phoneRegex } from '@constants';
import { WizardFormStep, Input, Dropdown, ToggleGroup } from '@basics';
import styles from './NewUserSetup.module.scss';
import { useShowNewUserPopup } from '@redux';

export const educationPageSchema = z.object({
  schoolYear: z.nativeEnum(SchoolYear),
  major: z.string().nonempty(NON_EMPTY_ERR_MSG).min(1, 'Not long enough.'),
});

export type EducationPageStore = z.infer<typeof educationPageSchema>;

export const educationPageInitialStore: EducationPageStore = {
  schoolYear: SchoolYear.First,
  major: '',
};

const EducationPage: FunctionComponent<WizardFormStep<EducationPageStore>> = ({
  schoolYear,
  major,
  validations,
  setStore,
}) => {
  const showNewUserPopup = useShowNewUserPopup();
  return (
    <Container>
      <Row className="justify-content-center m-2">
        <div className={styles.nameAskEducation}>
          Hi {showNewUserPopup?.name}, welcome!
        </div>
        <div className={styles.disclaimer}>
          Let’s start with some basic info about you!
        </div>
        <Col md={12}>
          <ToggleGroup
            singleSelect
            content={Object.values(SchoolYear)}
            label="School Year"
            toggleClassName="my-0"
            className={styles.schoolYearToggle}
            required
            initialSelected={schoolYear}
            onSelect={({ label, selected }) => {
              setStore({
                schoolYear: selected ? (label as SchoolYear) : undefined,
              });
            }}
            error={validations?.schoolYear?.error}
          />
        </Col>
        <Col md={12}>
          <Dropdown
            options={majors}
            label="Major"
            onSelect={(s) => setStore({ major: s || undefined })}
            initialSelected={major}
            placeholder="Major"
            isValid={validations?.major?.success}
            error={validations?.major?.error}
            required
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EducationPage as FunctionComponent;

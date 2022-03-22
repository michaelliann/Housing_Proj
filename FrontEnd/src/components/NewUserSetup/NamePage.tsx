import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as z from 'zod';
import { SchoolYear, NON_EMPTY_ERR_MSG, majors, phoneRegex } from '@constants';
import {
  WizardFormStep,
  Input,
  Dropdown,
  ToggleGroup,
  InputLine,
} from '@basics';
import styles from './NewUserSetup.module.scss';

export const namePageSchema = z.object({
  name: z.string().nonempty(NON_EMPTY_ERR_MSG),
});

export type NamePageStore = z.infer<typeof namePageSchema>;

export const namePageInitialStore: NamePageStore = {
  name: '',
};

const NamePage: FunctionComponent<WizardFormStep<NamePageStore>> = ({
  name,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="row justify-content-md-center m-2">
        <div className={styles.nameAsk}>What's Your Name?</div>

        <Col md={12} className="mb-3">
          <InputLine
            className={styles.nameInput}
            type="text"
            value={name}
            onChange={(e) => setStore({ name: e.target.value })}
            placeholder="Name"
            isValid={validations?.name?.success}
            error={validations?.name?.error}
          />
        </Col>
      </Row>
    </Container>
  );
};

// NOTE: need the "as FunctionComponent" since typescript doesn't know that WizardForm parent component will
// provide the WizardFormStep props
export default NamePage as FunctionComponent;

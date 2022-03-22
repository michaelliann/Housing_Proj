import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as z from 'zod';
import { SchoolYear, NON_EMPTY_ERR_MSG, majors, phoneRegex } from '@constants';
import { WizardFormStep, Input, Dropdown, ToggleGroup, Tooltip } from '@basics';
import styles from './NewUserSetup.module.scss';
import { miscIcons } from '@icons';

export const phonePageSchema = z.object({
  phone: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(phoneRegex, 'Phone number is not a valid format.'),
});

export type PhonePageStore = z.infer<typeof phonePageSchema>;

export const phonePageInitialStore: PhonePageStore = {
  phone: '',
};

const PhonePage: FunctionComponent<WizardFormStep<PhonePageStore>> = ({
  phone,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="row justify-content-md-center m-2">
        <Col sm={12} md={12}>
          <div className={styles.phoneAsk}>What’s your phone?</div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <div className={styles.phoneDisclaimer}>
            <div className={styles.infoIcon}>
              <miscIcons.infoCircle />
            </div>
            Just like you, ONLY people logged in with their UCSD emails will be
            able to see the contact info
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={10}>
          <Input
            className={styles.phoneInput}
            label=""
            type="text"
            value={phone}
            onChange={(e) => setStore({ phone: e.target.value })}
            placeholder="Phone number"
            isValid={validations?.phone?.success}
            error={validations?.phone?.error}
          />
        </Col>
      </Row>
    </Container>
  );
};

// NOTE: need the "as FunctionComponent" since typescript doesn't know that WizardForm parent component will
// provide the WizardFormStep props
export default PhonePage as FunctionComponent;

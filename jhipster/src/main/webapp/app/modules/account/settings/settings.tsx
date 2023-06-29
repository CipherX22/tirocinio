import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Impostazioni per l&apos;utente [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="Nome"
              id="firstName"
              placeholder="Il tuo nome"
              validate={{
                required: { value: true, message: 'Il nome è obbligatorio.' },
                minLength: { value: 1, message: 'Il nome deve essere di almeno 1 carattere' },
                maxLength: { value: 50, message: 'Il nome non può contenere più di 50 caratteri' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Cognome"
              id="lastName"
              placeholder="Il tuo cognome"
              validate={{
                required: { value: true, message: 'Il cognome è obbligatorio.' },
                minLength: { value: 1, message: 'Il cognome deve essere di almeno 1 carattere' },
                maxLength: { value: 50, message: 'Il cognome non può contenere più di 50 caratteri' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder="Il tuo indirizzo email"
              type="email"
              validate={{
                required: { value: true, message: "L'indirizzo email è obbligatorio." },
                minLength: { value: 5, message: "L'indirizzo email deve essere di almeno 5 caratteri" },
                maxLength: { value: 254, message: "L'indirizzo email non può contenere più di 50 caratteri" },
                validate: v => isEmail(v) || "L'indirizzo email non è valido.",
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              Salva
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;

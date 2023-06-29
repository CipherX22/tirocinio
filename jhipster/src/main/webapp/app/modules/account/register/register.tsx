import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Registrazione
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Utente"
              placeholder="Il tuo nome utente"
              validate={{
                required: { value: true, message: 'Il nome utente è obbligatorio.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Your username is invalid.',
                },
                minLength: { value: 1, message: 'Il nome utente deve essere di almeno 1 carattere' },
                maxLength: { value: 50, message: 'Il nome utente non può contenere più di 50 caratteri' },
              }}
              data-cy="username"
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
            <ValidatedField
              name="firstPassword"
              label="Nuova password"
              placeholder="Nuova password"
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'La password è obbligatoria.' },
                minLength: { value: 4, message: 'La password deve essere di almeno 4 caratteri' },
                maxLength: { value: 50, message: 'La password non può contenere più di 50 caratteri' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="Conferma nuova password"
              placeholder="Conferma nuova password"
              type="password"
              validate={{
                required: { value: true, message: 'La password di conferma è obbligatoria.' },
                minLength: { value: 4, message: 'La tua password deve essere di almeno 4 caratteri' },
                maxLength: { value: 50, message: 'La tua password non può contenere più di 50 caratteri' },
                validate: v => v === password || 'La password e la sua conferma non corrispondono!',
              }}
              data-cy="secondPassword"
            />
            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Crea Account
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>Se vuoi</span>
            <a className="alert-link">accedere</a>
            <span>
              , puoi provare gli account di default: <br /> - Amministratore (user = &quot;admin&quot; e la password = &quot;admin&quot;){' '}
              <br /> - utente (user = &quot;user&quot; e la password = &quot;user&quot;)
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;

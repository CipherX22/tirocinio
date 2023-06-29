import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Benvenuto, Java Hipster!</h2>
        <p className="lead">Questa è la tua home page</p>
        {account?.login ? (
          <div>
            <Alert color="success">Autenticato come &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Se vuoi
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                accedere
              </Link>
              , puoi provare gli account di default: <br /> - Amministratore (user = &quot;admin&quot; e la password = &quot;admin&quot;){' '}
              <br /> - utente (user = &quot;user&quot; e la password = &quot;user&quot;)
            </Alert>

            <Alert color="warning">
              Non hai ancora un account?&nbsp;
              <Link to="/account/register" className="alert-link">
                Crea un account
              </Link>
            </Alert>
          </div>
        )}
        <p>In caso di domande su JHipster:</p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              Homepage JHipster
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              JHipster su Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              JHipster tracciamento errori
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              Chat room pubblica di JHipster
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              segui @jhipster su Twitter
            </a>
          </li>
        </ul>

        <p>
          Se ti piace JHipster, non dimenticarti di darci una stella su{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../icons/not-found.png';
import './styles.scss';

const NotFound: React.FC = () => (
  <div className="not-found">
    <img src={NotFoundImage} data-testid="not-found-image" alt="not-found" />
    <p>Oops! The page are you looking for doesn&#39;t exist!</p>
    <Link to="/">Back to Home</Link>
  </div>
);

export default NotFound;

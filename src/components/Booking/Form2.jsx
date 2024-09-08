import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Form2 = () => {
  const state = useSelector((state) => state);

  return (
    <>

<p>Thank you for submitting your information. Here are the details you provided:</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Link to="/">Go Back</Link>
    </>
  );
};

export default Form2;

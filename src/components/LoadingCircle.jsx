import React from 'react';
import { Spinner } from "react-bootstrap";

export default function LoadingCircle() {
  return (
    <Spinner animation="border" role="status" className='data-circle'>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

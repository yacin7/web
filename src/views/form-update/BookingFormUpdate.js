import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate, useParams } from 'react-router-dom';

import ComponentCard from '../../components/ComponentCard';

const BookingFormUpdate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { bookingId } = useParams();

  useEffect(() => {
    console.log("Booking ID:", bookingId);
    // Fetch booking details based on bookingId
    fetch(`http://localhost:8090/web/afficherBooking/${bookingId}`)
      .then(response => response.json())
      .then(data => {
        // Set the form values with fetched data
        setValue('date', data.date);
        setValue('price', data.price);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      });
  }, [bookingId, setValue]);
  

  const onSubmit = (data) => {
    const updatedBooking = { date: data.date, price: data.price };
    console.log("Data to be sent:", updatedBooking);
    fetch(`http://localhost:8090/web/modifierBooking/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBooking)
    }).then(() => {
      navigate('/tables/Booking');
      console.log("Booking updated");
    }).catch(error => {
      console.error('Error updating booking:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Form Validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="date">
                  Date *
                </Label>
                <div className="mb-2">
                  <input
                    type="date"
                    {...register('date', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.date && 'Date is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="price">
                  Price *
                </Label>
                <div className="mb-2">
                  <input
                    type="number"
                    {...register('price', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.price && 'Price is required.'}</span>
              </FormGroup>

              <FormGroup>
                <Button className="button btn-info" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </Form>
            <hr />
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default BookingFormUpdate;

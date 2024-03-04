import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import ComponentCard from '../../components/ComponentCard';

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook

  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const onSubmit = (data) => {
    const booking = { date: data.date, price: data.price }; // Utiliser les mêmes noms que dans le formulaire
    console.log("Data to be sent:", booking); // Vérifiez les valeurs avant l'envoi
    fetch("http://localhost:8090/web/ajouterBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    }).then(() => {
      console.log("New News added");
    });
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Form Validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="date">
                  Data *
                </Label>
                <div className="mb-2">
                  <input
                    type="date"
                    {...register('date', { required: true })}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.date && 'date is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="price">
                  Price *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('price', { required: true })}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.price && 'price is required.'}</span>
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

export default BookingForm;

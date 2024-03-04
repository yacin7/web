import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate } from 'react-router-dom';


import ComponentCard from '../../components/ComponentCard';

const NewsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
  const [news, setNews] = useState({
    title: '',
    description: '',
    datenews: '',
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Here you can make an HTTP request to your Spring Boot backend to submit the product data
    // Example using fetch API
    fetch('http://localhost:8090/web/ajouterNews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Success:', responseData);
      // Optionally, you can handle success response here, like showing a success message or redirecting
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optionally, you can handle error response here, like showing an error message
    });
    
    setNews(data);
    navigate('/tables/News');
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Add New News">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="title">
                News title *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.name && 'News Title is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="description">
                  Description *
                </Label>
                <div className="mb-2">
                  <textarea
                    {...register('description', { required: true })}
                    className="form-control"
                  ></textarea>
                </div>
                <span className="text-danger">{errors.description && 'Description is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="datenews">
                Date news *
                </Label>
                <div className="mb-2">
                  <input
                    type="date"
                    {...register('datenews', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.price && 'Date is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="button btn-info" type="submit">
                  Add news
                </Button>
              </FormGroup>
            </Form>
            <hr />
            <h4 className="mt-5">news Information</h4>
            <ListGroup>
              <ListGroupItem>Title: {news.title}</ListGroupItem>
              <ListGroupItem>Description: {news.description}</ListGroupItem>
              <ListGroupItem>Date: {news.datenews}</ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default NewsForm;

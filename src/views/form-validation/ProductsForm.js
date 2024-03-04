import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate } from 'react-router-dom';

import ComponentCard from '../../components/ComponentCard';

const ProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Here you can make an HTTP request to your Spring Boot backend to submit the product data
    // Example using fetch API
    fetch('http://localhost:8090/web/ajouterProducts', {
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
    
    setProduct(data);
    navigate('/tables/News');
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Add New Product">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="name">
                  Product Name *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.name && 'Product name is required.'}</span>
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
                <Label className="control-Label" htmlFor="price">
                  Price *
                </Label>
                <div className="mb-2">
                  <input
                    type="number"
                    {...register('price', { required: true, min: 0 })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.price && 'Price is required and should be greater than or equal to 0.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="button btn-info" type="submit">
                  Add Product
                </Button>
              </FormGroup>
            </Form>
            <hr />
            <h4 className="mt-5">Product Information</h4>
            <ListGroup>
              <ListGroupItem>Name: {product.name}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
              <ListGroupItem>Price: {product.price}</ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default ProductForm;

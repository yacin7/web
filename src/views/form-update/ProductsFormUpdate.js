import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate , useParams} from 'react-router-dom';

import ComponentCard from '../../components/ComponentCard';

const ProductFormUpdate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { ProductId } = useParams();

  useEffect(() => {
    console.log("Product ID:", ProductId);
    // Fetch News details based on bookingId
    fetch(`http://localhost:8090/web/afficherProducts/${ProductId}`)
      .then(response => response.json())
      .then(data => {
        // Set the form values with fetched data
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('price', data.price);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Product details:', error);
        setLoading(false);
      });
  }, [ProductId, setValue]);


  const onSubmit = (data) => {
    const updatedProduct = { name: data.name, description: data.description, price: data.price };
    console.log("Data to be sent:", updatedProduct);
    fetch(`http://localhost:8090/web/modifierProducts/${ProductId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct)
    }).then(() => {
      navigate('/tables/Products');
      console.log("Product updated");
    }).catch(error => {
      console.error('Error updating Product:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default ProductFormUpdate;

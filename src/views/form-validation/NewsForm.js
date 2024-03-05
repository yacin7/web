import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../components/ComponentCard';

const NewsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [news, setNews] = useState({
    title: '',
    description: '',
    datenews: '',
  });
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const navigate = useNavigate();

  // Function to handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update state with selected file
  };

  const onSubmit = (data) => {
    const formData = new FormData(); // Use FormData to handle file upload

    // Append news data to formData using Object.entries()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the file to formData, if a file was selected
    if (file) {
      formData.append("file", file);
    }

    // Make the HTTP request with formData
    fetch('http://localhost:8090/web/ajouterNews', {
      method: 'POST',
      body: formData, // Send formData instead of JSON
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Success:', responseData);
      // Handle success, e.g., showing a success message or redirecting
      setNews(data); // Update state with the submitted data
      navigate('/tables/News'); // Redirect after submit
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error, e.g., showing an error message
    });
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Add New News">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="title">News title *</Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="form-control"
                  />
                </div>
                {errors.title && <span className="text-danger">News Title is required.</span>}
              </FormGroup>
              
              <FormGroup>
                <Label className="control-Label" htmlFor="description">Description *</Label>
                <div className="mb-2">
                  <textarea
                    {...register('description', { required: true })}
                    className="form-control"
                  ></textarea>
                </div>
                {errors.description && <span className="text-danger">Description is required.</span>}
              </FormGroup>
              
              <FormGroup>
                <Label className="control-Label" htmlFor="datenews">Date news *</Label>
                <div className="mb-2">
                  <input
                    type="date"
                    {...register('datenews', { required: true })}
                    className="form-control"
                  />
                </div>
                {errors.datenews && <span className="text-danger">Date is required.</span>}
              </FormGroup>

              <FormGroup>
                <Label className="control-Label">Upload File *</Label>
                <div className="mb-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <Button className="button btn-info" type="submit">Add news</Button>
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
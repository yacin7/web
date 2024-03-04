import React, { useState, useEffect  } from 'react';
import { Row, Col, Button, FormGroup, Label} from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import { useNavigate, useParams } from 'react-router-dom';


import ComponentCard from '../../components/ComponentCard';

const NewsForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { NewsId } = useParams();


  useEffect(() => {
    console.log("News ID:", NewsId);
    // Fetch News details based on bookingId
    fetch(`http://localhost:8090/web/afficherNews/${NewsId}`)
      .then(response => response.json())
      .then(data => {
        // Set the form values with fetched data
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('datenews', data.datenews);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news details:', error);
        setLoading(false);
      });
  }, [NewsId, setValue]);

  const onSubmit = (data) => {
    const updatedNews = { title: data.title, description: data.description, datenews: data.datenews };
    console.log("Data to be sent:", updatedNews);
    fetch(`http://localhost:8090/web/modifierNews/${NewsId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNews)
    }).then(() => {
      navigate('/tables/News');
      console.log("News updated");
    }).catch(error => {
      console.error('Error updating News:', error);
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
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
                <span className="text-danger">{errors.title && 'News Title is required.'}</span>
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
            
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default NewsForm;

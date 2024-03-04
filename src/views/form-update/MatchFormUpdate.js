import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ComponentCard from '../../components/ComponentCard';

const MatchFormUpdate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [matches, setMatches] = useState({
    datematch: '',
    nameplayer1: '',
    nameplayer2: '',
    scoreplayer1: '',
    scoreplayer2: '',
    imageplayer1: null,
    imageplayer2: null,
    nbrparticipants: '',
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('datematch', data.datematch);
    formData.append('nameplayer1', data.nameplayer1);
    formData.append('nameplayer2', data.nameplayer2);
    formData.append('scoreplayer1', data.scoreplayer1);
    formData.append('scoreplayer2', data.scoreplayer2);
    formData.append('nbrparticipants', data.nbrparticipants);
    
    // Vérifier si des fichiers ont été sélectionnés avant d'ajouter à formData
    if (data.imageplayer1 && data.imageplayer1[0]) {
      formData.append('image1', data.imageplayer1[0]);
    }
    if (data.imageplayer2 && data.imageplayer2[0]) {
      formData.append('image2', data.imageplayer2[0]);
    }

    fetch('http://localhost:8090/web/ajouterMatch', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Success:', responseData);
        setMatches(data); // Mise à jour des matches avec les données soumises
        navigate('/tables/Match');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Row>
      <Col sm="12">
        <ComponentCard title="Add New Match">
          <form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
            <FormGroup>
              <Label className="control-Label" htmlFor="nameplayer1">Name Player 1 *</Label>
              <div className="mb-2">
                <input type="text" {...register('nameplayer1', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.nameplayer1 && 'Name is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="imageplayer1">Image player1 *</Label>
              <div className="mb-2">
                <input type="file" className="form-control" />
              </div>
              <span className="text-danger">{errors.imageplayer1 && 'Image player 1 is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="scoreplayer1">Score Player 1 *</Label>
              <div className="mb-2">
                <input type="number" {...register('scoreplayer1', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.scoreplayer1 && 'Score is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="nameplayer2">Name Player 2 *</Label>
              <div className="mb-2">
                <input type="text" {...register('nameplayer2', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.nameplayer2 && 'Name is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="imageplayer2">Image player2 *</Label>
              <div className="mb-2">
                <input type="file" className="form-control" />
              </div>
              <span className="text-danger">{errors.imageplayer2 && 'Image player 2 is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="scoreplayer2">Score Player 2 *</Label>
              <div className="mb-2">
                <input type="number" {...register('scoreplayer2', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.scoreplayer2 && 'Score is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="datematch">Date Match *</Label>
              <div className="mb-2">
                <input type="date" {...register('datematch', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.datematch && 'Date is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="nbrparticipants">Number participant *</Label>
              <div className="mb-2">
                <input type="number" {...register('nbrparticipants', { required: true })} className="form-control" />
              </div>
              <span className="text-danger">{errors.nbrparticipants && 'Score is required.'}</span>
            </FormGroup>
            <FormGroup>
              <Button className="button btn-info" type="submit">Add Match</Button>
            </FormGroup>
          </form>
          {/* Afficher les informations soumises après la soumission du formulaire */}
          {matches && (
            <div>
              <hr />
              <h4 className="mt-5">Submitted Information</h4>
              <ListGroup>
                <ListGroupItem>Title: {matches.title}</ListGroupItem>
                {/* Affichez les autres informations ici */}
              </ListGroup>
            </div>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default MatchFormUpdate;

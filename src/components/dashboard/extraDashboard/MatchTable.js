import React from "react";
import {Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ProjectTables = () => {
  const [Match, setMatch] = React.useState([]);
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/MatchForm');
  };
  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutMatch")
      .then((res) => res.json())
      .then((result) => {
        setMatch(result);
      });
  }, []);
  return (
    <div>
       <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add Match
      </Button>
      
          <Table className="no-wrap align-middle" responsive borderless>
            <thead>
              <tr>
                <th className='px-4'>Name Player 1</th>
                <th className='px-4'>Score Player1</th>
                <th className='px-4'>Name Player 2</th>
                <th className='px-4'>Score Player2</th>
                <th className='px-4'>Date Match</th>
                <th className='px-4'>Number participant</th>
              </tr>
            </thead>
            <tbody>
            {Match.map((match) => (
                <tr key={match.id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                    <img
                        src={match.imageplayer1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      
                      <div className="ms-3">
                        <h5 className="mb-0 fw-medium">{match.nameplayer1}</h5>
                      </div>
                    </div>
                  </td>
                  <td>{match.scoreplayer1}</td>
                  <td>
                    <div className="d-flex align-items-center p-2">
                    <img
                        src={match.imageplayer2}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      
                      <div className="ms-3">
                        <h5 className="mb-0 fw-medium">{match.nameplayer2}</h5>
                      </div>
                    </div>
                  </td>
                  <td>{match.scoreplayer2}</td>
                  <td>{match.datematch}</td>
                  <td>{match.nbrparticipants}</td>

                 
                </tr>
              ))}
            </tbody>
          </Table>
    </div>
  );
};

export default ProjectTables;

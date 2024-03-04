import React from "react";
import {Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const ProjectTables = () => {
  const [User, setUser] = React.useState([]);
  const navigate = useNavigate();

  const onSubmit = () => {
      navigate('/UserForm');
    };
  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutUser")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);
  return (
    <div>
      <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add User
      </Button>
          <Table className="no-wrap align-middle" responsive borderless>
            <thead>
              <tr>
                <th className='px-4'>Username</th>
                <th className='px-4'>Birthdate</th>
                <th className='px-4'>Height</th>
                <th className='px-4'>Weight</th>
              </tr>
            </thead>
            <tbody>
            {User.map((user) => (
                <tr key={user.id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                    <img
                        src={user.profilpicture}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h5 className="mb-0 fw-medium">{user.username}</h5>
                        <span className="text-muted">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.birthdate}</td>
                  <td>{user.height}</td>
                  <td>{user.weight}</td>

                 
                </tr>
              ))}
            </tbody>
          </Table>
    </div>
  );
};

export default ProjectTables;

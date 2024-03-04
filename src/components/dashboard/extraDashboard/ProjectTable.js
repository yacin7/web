import React from "react";
import {Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



const ProjectTables = () => {
  const [Products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  const onSubmit = () => {
      navigate('/ProductsForm');
    };
  
  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutProducts")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const handleUpdate = (idProducts) => {
    // Implement your update logic here
    console.log("Update Products with ID:", idProducts);
    navigate(`/ProductFormUpdate/${idProducts}`); 
  };

  const handleDelete = (idProducts) => {
    // Implement your delete logic here
    console.log("Delete Products with ID:", idProducts);
    fetch(`http://localhost:8090/web/supprimerProducts/${idProducts}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted booking from the state
        setProducts(Products.filter(products => products.idProducts !== idProducts));
        
      })
      .catch((error) => {
        console.log("Error deleting booking:", error);
      });
  };
  return (
    <div>
      <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add Products
      </Button>
      
          <Table className="no-wrap align-middle" responsive borderless>
            <thead>
              <tr>
                <th className='px-4'>Name</th>
                <th className='px-4'>Description</th>

                <th className='px-4'>Price</th>
                <th className='px-4'>Update / Delete</th>
              </tr>
            </thead>
            <tbody>
            {Products.map((product) => (
                <tr key={product.id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      
                      <div className="ms-3">
                        <h5 className="mb-0 fw-medium">{product.name}</h5>
                      </div>
                    </div>
                  </td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                  <Button
                    color="info"
                    onClick={() => handleUpdate(product.idProducts)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() => handleDelete(product.idProducts)}
                  >
                    Delete
                  </Button>
                </td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
    </div>
  );
};

export default ProjectTables;

import React from "react";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/users/user4.jpg';

const ShopListing = () => {
  const [Products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutProducts")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  return (
    <div className="p-4">
      <Row>
      {Products && Products.map((product) => (
          <Col lg="4" key={product.idProducts} className="mb-4">
            <Link to="/apps/shopdetail">
              <img src={img1} alt="product" className="img-fluid rounded-3" />
            </Link>
            
            <div className="pt-2">
              <small>Description :{product.description}</small>
              <h5 className="mb-3">Name :{product.name}</h5>
              <div className="d-flex align-items-center">
                <h5>{product.price} Dt</h5>
                <div className="ms-auto">
                 
                    <i className="bi bi-star-fill text-warning" />
                
                </div>
              </div>
            </div>
            
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopListing;
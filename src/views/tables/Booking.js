import React from 'react';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../components/ComponentCard';

const Bookings = () => {
  const [Booking, setBooking] = React.useState([]);
  const navigate = useNavigate();

  const onSubmit = () => {
      navigate('/BookingForm');
    };
  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutBooking")
      .then((res) => res.json())
      .then((result) => {
        setBooking(result);
      });
  }, []);
  return (
    <>
      
     

      <ComponentCard
        title="Booking Table"
        
      >
        <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add Booking
      </Button>
      
        
        <Table responsive>
          <thead>
            <tr>
              <th>Price</th>
              <th>Date Booking</th>
            </tr>
          </thead>
          <tbody>
          {Booking.map((booking) => (
            <tr>
              <td>{booking.price}</td>
              <td>{booking.date}</td>
            </tr>
            ))}
          </tbody>
        </Table>
        
      </ComponentCard>

     
    </>
  );
};

export default Bookings;

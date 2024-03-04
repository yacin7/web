import React from 'react';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../components/ComponentCard';

const Bookings = () => {
  const [bookings, setBookings] = React.useState([]);
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/BookingForm');
  };

  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutBooking")
      .then((res) => res.json())
      .then((result) => {
        setBookings(result);
      });
  }, []);

  const handleUpdate = (bookingId) => {
    // Implement your update logic here
    console.log("Update booking with ID:", bookingId);
    navigate(`/BookingFormUpdate/${bookingId}`);  
  };

  const handleDelete = (bookingId) => {
    // Implement your delete logic here
    console.log("Delete booking with ID:", bookingId);
    fetch(`http://localhost:8090/web/supprimerBooking/${bookingId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted booking from the state
        setBookings(bookings.filter(booking => booking.idBooking !== bookingId));
        
      })
      .catch((error) => {
        console.log("Error deleting booking:", error);
      });
  };

  return (
    <>
      <ComponentCard title="Booking Table">
        <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add Booking
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th>Price</th>
              <th>Date Booking</th>
              <th>Update / Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.idBooking}>
                <td>{booking.price}</td>
                <td>{booking.date}</td>
                <td>
                  <Button
                    color="info"
                    onClick={() => handleUpdate(booking.idBooking)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() => handleDelete(booking.idBooking)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ComponentCard>
    </>
  );
};

export default Bookings;
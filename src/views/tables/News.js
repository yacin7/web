import React from 'react';
import {Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



import ComponentCard from '../../components/ComponentCard';

const Newss = () => {
  const [News, setNews] = React.useState([]);
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/NewsForm');
  };

  React.useEffect(() => {
    fetch("http://localhost:8090/web/affichertoutNews")
      .then((res) => res.json())
      .then((result) => {
        setNews(result);
      });
  }, []);

  const handleUpdate = (idNews) => {
    // Implement your update logic here
    console.log("Update News with ID:", idNews);
    navigate(`/NewsFormUpdate/${idNews}`); 
  };

  const handleDelete = (idNews) => {
    // Implement your delete logic here
    console.log("Delete New with ID:", idNews);
    fetch(`http://localhost:8090/web/supprimerNews/${idNews}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted news from the state
        setNews(News.filter(news => news.idNews !== idNews));
        
      })
      .catch((error) => {
        console.log("Error deleting booking:", error);
      });
  };
  return (
    <>

      <ComponentCard
        title="News Table"
        
      >
        <Button className="btn" color="primary" size="lg" onClick={onSubmit}>
          Add News
      </Button>
        <Table responsive>
          <thead>
            <tr>
            <th>image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date news</th>
              <th>Update / Delete</th>
            </tr>
          </thead>
          <tbody>
          {News.map((news) => (
  <tr key={news.idNews}> {/* Add key prop here */}
    <td>
      <img
        src={news.imagenews}
        alt="avatar"
        width="45"
        height="45"
      />
    </td>
    <td>{news.title}</td>
    <td>{news.description}</td>
    <td>{news.datenews}</td>
    <td>
      <Button
        color="info"
        onClick={() => handleUpdate(news.idNews)}
      >
        Update
      </Button>{" "}
      <Button
        color="danger"
        onClick={() => handleDelete(news.idNews)}
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

export default Newss;

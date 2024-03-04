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
              <th>Title</th>
              <th>Description</th>
              <th>Date news</th>
            </tr>
          </thead>
          <tbody>
          {News.map((news) => (
            <tr>
              <td>{news.title}</td>
              <td>{news.description}</td>
              <td>{news.datenews}</td>
            </tr>
            ))}
          </tbody>
        </Table>
        
      </ComponentCard>

     
    </>
  );
};

export default Newss;

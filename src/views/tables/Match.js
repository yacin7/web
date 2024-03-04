import React from 'react';
import MatchTable from '../../components/dashboard/extraDashboard/MatchTable';


import ComponentCard from '../../components/ComponentCard';

const Match = () => {
  
  return (
    <>
      
     

       
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard
        title="Match Listing"
        
      >
        <MatchTable />
      </ComponentCard>

     
    </>
  );
};

export default Match;

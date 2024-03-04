import React from 'react';

import ComponentCard from '../../components/ComponentCard';
import ProjectTables from '../../components/dashboard/extraDashboard/ProjectTable';

const Productss = () => {
  return (
    <>
      
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      
      <ComponentCard
        title="Product Listing"
        
      >
        <ProjectTables />
      </ComponentCard>
      

      
    </>
  );
};

export default Productss;

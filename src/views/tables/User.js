import React from 'react';

import ComponentCard from '../../components/ComponentCard';
import UserTable from '../../components/dashboard/extraDashboard/UserTable';

const User = () => {
  return (
    <>
      
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard
        title="User Listing"
        
      >
        <UserTable />
      </ComponentCard>
      

      
    </>
  );
};

export default User;

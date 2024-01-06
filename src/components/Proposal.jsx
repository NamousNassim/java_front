import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proposal = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('http://localhost:9081/dukes-data/api/Proposals');
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div>
      <h1>Proposals</h1>
      {proposals.map((proposal) => (
        <div key={proposal.proposalID}>
          <h2>Proposal {proposal.proposalID}</h2>
          <p>Price: {proposal.price}</p>
          <p>Description: {proposal.description}</p>
          <h3>Client: {proposal.client.user.name}</h3>
          <p>Email: {proposal.client.user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Proposal;
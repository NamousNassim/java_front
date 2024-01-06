import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Card, Button , Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Proposal from './Proposal';
import HomePageHeader from './HomePageHeader';
const Home = () => {
  const { user } = useContext(UserContext);
  const [freelancers, setFreelancers] = useState([]);
  const [price, setPrice] = useState('');
  const [proposal ,setProposals] = useState([]); 
  const [description, setDescription] = useState('');
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchProposals = async () => {
      if (user) {
        const fetchedProposals = await fetchProposalsByClientId(user.id);
        setProposals(fetchedProposals);
      }
    };
  
    fetchProposals();
  }, [user]);


  const [proposals, getProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('http://localhost:9081/dukes-data/api/Proposals');
        getProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);



  const fetchProposalsByClientId = async (clientId) => {
    if (user.role == 'client')
    {
    try {
      const response = await axios.get(`http://localhost:9081/dukes-data/api/Proposals/client?clientId=${clientId}`);
      console.log('Proposals fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } }
  };
  const handleProposalSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Fetch the client ID
      const response = await axios.get(`http://localhost:9081/dukes-data/api/users/client/${user.id}`);
      const clientID = response.data.clientID;
      
      // Create the proposal object
      const proposal = {
        price: price,
        description: description
      };
      
      console.log(proposal.price , proposal.description , clientID);
      
      // Send the proposal object and clientID as a query parameter
      const submitResponse = await axios.post(`http://localhost:9081/dukes-data/api/Proposals?clientId=${user.id}`, proposal);
  
    
if (submitResponse.status === 200) {
  // Handle successful submission
  handleShow();
    } else {
      // TODO: Handle error
      console.error('Error submitting proposal')
    }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
};
  useEffect(() => {
    if (user && user.role === 'client') {
      axios.get('http://localhost:9081/dukes-data/api/users')
        .then(response => {
          const users = response.data;
          const freelancers = users.filter(user => user.role === 'freelancer');
          return Promise.all(freelancers.map(freelancer => axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${freelancer.id}`)));
        })
        .then(responses => {
          const freelancers = responses
            .filter(response => response.status === 200)
            .map(response => response.data);
          setFreelancers(freelancers);
        })
        .catch(error => console.error(error));
    }
  }, [user]);

  return (
    <div className="container py-5">
      <HomePageHeader/> 

      
      {user && <h2 className="mb-4">Welcome, {user.name} you are a  {user.role} !</h2>}
      { user && user.role === 'freelancer' && (
<div className="container">
<h1 className="my-4">Proposals</h1>
{proposals.length === 0 && <p className="lead">No proposals found.</p>}
{proposals.map((proposal) => (
  
  <div key={proposal.proposalID} className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">Proposal {proposal.proposalID}</h5>
      <p className="card-text">Price: {proposal.price}</p>
      <p className="card-text">Description: {proposal.description}</p>
      <h6 className="card-subtitle mb-2 text-muted">Client: {proposal.client.user.name}</h6>
      <p className="card-text">Email: {proposal.client.user.email}</p>
    </div>
    <Link to={`/proposal/${proposal.client.clientID}`} className='btn btn-primary'>Contact</Link>
  </div>
))}
</div>
)}
      {user && user.role === 'client' && (
        <div className="mt-4">
          <h2 className="mb-4">Add a Proposal</h2>
          <form onSubmit={handleProposalSubmit} className="mb-4">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit Proposal</button>
          </form> 
         <div>
           <Proposal />
          </div>
        
          {user && user.role === 'client' && freelancers.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-4">Freelancers</h2>
              <div className="row">
                {freelancers.map(freelancer => (
                  <div className="col-md-4 mb-4" key={freelancer.id}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{freelancer.user.name}</Card.Title>
                        <Link to={`/contact/${freelancer.user.id}`} className="btn btn-primary">Contact</Link>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Proposal submitted successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => { handleClose(); window.location.reload(); }}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Home;
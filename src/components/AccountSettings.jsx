import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import Modal from 'react-bootstrap/Modal';

const AccountSettings = () => {
  const [proposals, setProposals] = useState([]);
  const { user } = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [editShow, setEditShow] = useState(false);
const [currentProposal, setCurrentProposal] = useState(null);
  useEffect(() => {
    if (user && user.role === 'freelancer') {
      axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${user.id}`)
        .then(response => {
          const freelancerId = response.data.freelancerId;
          console.log("freelance id skills : "+freelancerId ,"USER ID SKILLS"+ user.id)
          return axios.get(`http://localhost:9081/dukes-data/api/Skills/freelancer/${freelancerId}`);
        })
        .then(response => setSkills(response.data))
        .catch(error => console.error(error));
    }
  }, [user]);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (id) => {
    const proposalToEdit = proposals.find(proposal => proposal.id === id);
    setCurrentProposal(proposalToEdit);
    setEditShow(true);
  };
  useEffect(() => {
    const fetchProposals = async () => {
      if (user) {
        const fetchedProposals = await fetchProposalsByClientId(user.id);
        setProposals(fetchedProposals);
      }
    };
  
    fetchProposals();
  }, [user]);
  const updateProposal = async (id, newProposalData) => {
    try {
      const response = await axios.put(`http://localhost:9081/dukes-data/api/Proposals/${id}`, newProposalData);
      console.log('Proposal updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    if (currentProposal) {
      const newProposalData = {
        price: currentProposal.price,
        description: currentProposal.description
      };
      await updateProposal(currentProposal.id, newProposalData);
      const updatedProposals = proposals.map(proposal => 
        proposal.id === currentProposal.id ? {...proposal, ...newProposalData} : proposal
      );
      setProposals(updatedProposals);
      handleEditClose();
    }
  };
  const fetchProposalsByClientId = async (clientId) => {
    try {
      const response = await axios.get(`http://localhost:9081/dukes-data/api/Proposals/client?clientId=${clientId}`);
      console.log('Proposals fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'freelancer') {
      axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${user.id}`)
        .then(response => {
          const freelancerId = response.data.freelancerId;
          console.log( "projects : " , freelancerId)
          return axios.get(`http://localhost:9081/dukes-data/api/Projects/freelancer/${freelancerId}`)
        })
        .then(response => setProjects(response.data))
        .catch(error => console.error(error));
    }
  }, [user]);
  const handleAddProject = (event) => {
    event.preventDefault();
  
    axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${user.id}`)
    .then(response => {
      
  
      const project = {
        projectName,
        projectDescription,
        freelancer: { freelancerId: user.id}
      };
      console.log(project);
      return axios.post('http://localhost:9081/dukes-data/api/Projects', project);
    })
      .then(response => {
        console.log(response.data);
        setProjectName('');
        setProjectDescription('');
      })
      .catch(error => {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      });
  };
  const deleteProposal = async (id) => {
    try {
     
        const response = await axios.delete(`http://localhost:9081/dukes-data/api/Proposals/${id}`);
        console.log('Proposal deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting proposal:', error);
    }
};

  const handleDelete = async (id) => {
    await deleteProposal(id);
    const updatedProposals = proposals.filter(proposal => proposal.proposalID !== id);
    setProposals(updatedProposals);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (user && user.role === 'freelancer') {
      axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${user.id}`)
        .then(response => {
          const freelancerId = response.data.freelancerId;
          console.log(freelancerId , user.id)
          return axios.post(`http://localhost:9081/dukes-data/api/Skills/freelancer/${user.id}`, { name: JSON.stringify(newSkill) });
        })
        .then(() => {
          setNewSkill('');
          return axios.get(`http://localhost:9081/dukes-data/api/users/freelancer/${user.id}`);
        })
        .then(response => {
          const freelancerId = response.data.freelancerId;
          console.log("tets"+freelancerId);
          return axios.get(`http://localhost:9081/dukes-data/api/Skills/freelancer/${freelancerId}`);
        })
        .then(response => setSkills(response.data))
        .catch(error => console.error(error));
    }
  };
  const deleteSkill = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:9081/dukes-data/api/Skills/${id}`);
        console.log('Skill deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting skill:', error);
    }
};

  const handleDeleteSkill = async (id) => {
    await deleteSkill(id);
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
  };

  if (user && user.role === 'freelancer') {
    return (
      <div className="container py-5">
      <div className="row">
        <div className="col-lg-6">
          <h2>Your Skills</h2>
          {skills.length > 0 ? (
            <ul className="list-group">
              {skills.map((skill, index) => (
  <div key={index}>
         <p>Skill: {skill.name}</p>
     <button className="btn btn-danger" onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
  </div>
))}
                        </ul>
          ) : (
            <p className="text-muted">No skills are defined.</p>
          )}
    
          <form onSubmit={handleFormSubmit} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                value={newSkill}
                onChange={event => setNewSkill(event.target.value)}
                placeholder="Add a skill"
                className="form-control"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Add Skill</button>
              </div>
            </div>
          </form>
        </div>
    
        <div className="col-lg-6">
          <h2>Projects</h2>
          {projects.length === 0 ? (
            <p>No projects added</p>
          ) : (
            projects.map(project => (
              <div key={project.projectID} className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title">{project.projectName}</h3>
                  <p className="card-text">{project.projectDescription}</p>
                </div>
              </div>
            ))
          )}
    
          <form onSubmit={handleAddProject} className="mt-3">
            <h2>Add a Project</h2>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input type="text" className="form-control" id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea className="form-control" id="projectDescription" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Project</button>
          </form>
        </div>
      </div>
    </div>
    );
    } else {
      return (
          <div> 
              <h1>Account Settings</h1>
              <p>your proposal.</p>
              {proposals.map((proposal, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Proposal {index + 1}</h5>
                 
                <p>Price: {proposal.price}</p>
                <p>Description: {proposal.description}</p>
                <button className="btn btn-primary" onClick={() => handleEditShow(proposal.proposalID)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(proposal.proposalID)}>Delete</button>
              </div>
            </div>
          ))}
          <Modal show={editShow} onHide={handleEditClose}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Proposal</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleUpdateSubmit}>
      <div className="form-group">
        <label htmlFor="editPrice">Price</label>
        <input type="number" className="form-control" id="editPrice" value={currentProposal ? currentProposal.price : ''} onChange={e => setCurrentProposal({ ...currentProposal, price: e.target.value })} required />
      </div>
      <div className="form-group">
        <label htmlFor="editDescription">Description</label>
        <textarea className="form-control" id="editDescription" value={currentProposal ? currentProposal.description : ''} onChange={e => setCurrentProposal({ ...currentProposal, description: e.target.value })} required />
      </div>
      <button type="submit" className="btn btn-primary">Update Proposal</button>
    </form>
  </Modal.Body>
</Modal>
  
          </div>
      );
    }
    };

export default AccountSettings;
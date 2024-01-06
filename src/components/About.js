import React from 'react';
import logo from '../static/1.png';
import person1 from '../static/wail.png';
import person2 from '../static/nassim.jpg';
import person3 from '../static/khalid.jpeg';
import person4 from '../static/nouhaila.png';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body text-center p-5">
              <img src={logo} alt="Logo" className="img-fluid rounded-circle mb-4" style={{width: '150px', height: '150px'}} />
              <h1 className="display-4 mb-4" style={{textAlign: 'center'}}>About Gig Force</h1>
              <p className="lead text-muted">
              Welcome to Gig Force, your premier platform for freelance services. 
                Our mission is to seamlessly connect talented freelancers with clients 
                seeking top-notch skills for their projects. Whether you're a freelancer 
                looking for exciting opportunities or a client in need of skilled 
                professionals, Gig Force is the place to be. Join us in shaping the 
                future of freelancing!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <h2 className="mb-4 text-center">Meet the Dev Team</h2>
          <div className="row">
            {[person1, person2, person3, person4].map((person, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <img src={person} alt="Person" className="img-fluid rounded-circle mb-2" style={{width: '100px', height: '100px'}} />
                <h5 className="mb-0">Person {index + 1}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
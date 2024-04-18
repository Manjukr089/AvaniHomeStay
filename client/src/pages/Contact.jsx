// import React from 'react'
// const Contact = () => {
// return (
// <div className="container contact">
//     <div className="row">
//         <div className="col-md-8 col-12 mx-auto">
//             <div className="card shadow-lg border-0 p-4">
//                 <h1 className="text-center bg-dark text-white display-4 d-inline-block">Contact us</h1>
//                 <div className="form-group my-5">
//                     <div className="row">
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="text" className="form-control-lg" placeholder="First Name" required />
//                         </div>
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="text" className="form-control-lg" placeholder="last Name" required />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="form-group mb-5">
//                     <div className="row">
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="email" className="form-control-lg" placeholder="Email Address" required />
//                         </div>
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="tel" className="form-control-lg" placeholder="Phone no." required />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-11">
//                         <textarea className="form-control" row="20" placeholder="Your message" required></textarea>
//                     </div>
//                 </div>
//                 <div className="mt-5 col-md-6 col-12 mx-auto">
//                     <button className="btn btn-outline-dark btn-lg btn-block">Send Message</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// )
// }
// export default Contact

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import contactImg from '../images/avani/01.jpg'
const Contact = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6} style={{ marginTop: '40px' }} >
          <h2>Place Information</h2>
          {/* <p><strong>Name:</strong> Avani Home Stay</p>
          <p><strong>Mobile Number:</strong> +1234567890</p>
          <p><strong>Street Name:</strong> Example Street</p> */}
          <img src={contactImg} alt="" height={400} width={'100%'} />
        </Col>
        <Col sm={12} md={6} style={{ marginTop: '100px' }}>
          {/* Place your map component here */}
          {/* Embed Google Maps iframe */}
          <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0' }}>
            <h6> Find route to Avani Home Stay</h6>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12428.834394890351!2d75.24244956829078!3d13.427466479863156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb431c445106e3%3A0xefcf2a250fa266e7!2sAVANI%20HOMESTEYADISHANKARA%20BADAVANE%20SRINGERI!5e0!3m2!1sen!2sin!4v1712733032100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;

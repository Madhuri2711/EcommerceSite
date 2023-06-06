import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ManageUsers = () => {
    return (
        <>

{({ touched, errors }) => (
  
           
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      disabled
                      className={`form-control ${
                        touched.email && errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
            
       
          )}
              
      
<div className="card card-default" style={{marginTop:'3rem', marginRight:'2rem'}}>
  <div className="card-header"> 
    <h1>Users</h1>

    {/* <a className="btn mdi mdi-code-tags" data-toggle="collapse" href="#collapse-data-tables" role="button" aria-expanded="false"
      aria-controls="collapse-data-tables"> </a> */}

  </div>
  <div className="card-body">
    

    <table id="productsTable" className="table  table-product" style={{'width':'100%'}}>
  <thead>

    <tr>
      <th>ID</th>
      <th>Image</th>
      <th>Name</th>
      <th>Email</th>
      <th>USerName</th>
      <th>LoginID</th>
      <th>Action</th>
     
    </tr>
  </thead>
  <tbody>
  
  <tr>
  <td>1</td>
      <td className="p-2">
        <img src="images/products/products-xs-01.jpg" alt="Product Image"/>
      </td>
      <td>Coach Swagger</td>
      <td>hello</td>
      <td>27</td>
     
      <td>234fr</td>
      <td>
        {/* <a href="#">
          <i className="mdi mdi-open-in-new"></i>
        </a> */}
        <a href="#">
          <i className="mdi mdi-close text-danger"></i>
        </a>

      </td>
      
    
    </tr>
  </tbody>
  </table>

 </div>
 </div>

        
        </>
    )
}

export default ManageUsers
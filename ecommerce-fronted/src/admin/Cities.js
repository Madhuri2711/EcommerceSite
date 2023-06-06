import React from 'react'

const Cities = () => {
  return (
    <>
    
<div className="card card-default" style={{marginTop:'3rem', marginRight:'2rem'}}>
  <div className="card-header"> 
    <h1>Cities</h1>

    
 <button type="button" class="btn mdi mdi-plus mdi-18px" data-toggle="modal" data-target="#exampleModalForm">         
            </button>

<div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalFormTitle">Modal Title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter email"/>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
         
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-pill" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-pill">Save Changes</button>
      </div>
    </div>
  </div>
</div>


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
          <i class="mdi mdi-close text-danger mdi-24px"></i>
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

export default Cities

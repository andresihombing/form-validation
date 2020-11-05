import React, { Component } from 'react';
import './App.css';
import distribution from './distribution.js';
import name from './name.js';
import payment from './paymentType';
import DatePicker from "react-datepicker";
import product from "./product";
import "react-datepicker/dist/react-datepicker.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: [],
      name: '',
      nameError: '',
      distributionCenter: '',
      distributionCenterError: '',
      paymentData: '',
      paymentDataError: '',
      expiredDate: new Date(),
      expiredDateError: '',
      notes: '',
      notesError: '',
      product: '',
      productError: '',
      unit: '',
      unitError: '',
      quality: '',
      qualityError: '',
      price: '',
      priceError: '',
      totalPrice: '',
      totalPriceError: '',      
      buttonHide: false
    }
  }

  componentWillMount(){
    this.getList()
  }

  //fetch dari api
  getList(){            
    let urlFetch = `http://dummy.restapiexample.com/api/v1/employees`
    fetch(urlFetch,
      {
          method: 'GET',            
      }).then((response) => response.json()).then(async (responseJson) => {          
          this.setState({
            listName: responseJson.data
          })
      }).catch((error) => {                
          //data dari local jika api bermasalah
          this.setState({
            listName: name
          })
      });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  
  //validasi form
  validate = () => {    
    if(!this.state.name){
      this.setState({ nameError: "Please insert your name !" });
    }else if(!this.state.distributionCenter){
      this.setState({ distributionCenterError: "Please insert distribution !" });
    }else if(!this.state.paymentData){
      this.setState({ paymentDataError: "Please insert payment data !" });
    }else if(!this.state.expiredDate){
      this.setState({ expiredDateError: "Please insert expired date !" });
    }else if(!this.state.product){
      this.setState({ productError: "Please insert product !" });
    }else if(!this.state.unit){
      this.setState({ unitError: "Please insert unit !" });
    }else if(!this.state.quality){
      this.setState({ qualityError: "Please insert quality !" });
    }else if(!this.state.price){
      this.setState({ priceError: "Please insert price !" });
    }else{
      alert('succsess')
    }
  }

  //handle date picker
  handleChange = startDate => {    
    this.setState({
      expiredDate: startDate
    });
  };

  render() {       
    return (
      <div className="App">      
        <p className='font-weight-bold'>Create Order</p>
        <div className='form-bg'>
          <div className="row">
            <div className="col-2 font-weight-bold">
              <p>Detail</p>
            </div>
            <div className="col-6">              
              <label><small>Name<b className='text-danger'>*</b></small></label>                
              <select className="form-control"  name="name" onChange={this.myChangeHandler}>
              <option value="" selected disabled>Name</option>
                {
                  this.state.listName.map((data, index) => {
                    return(
                    <option>{data.employee_name}</option>
                    )
                  })
                }                  
              </select>                              
              <i>{this.state.nameError}</i>
            </div>          
          </div>
          <div className="row">
            <div className="col-2"/>
            <div className="col-5">              
              <label><small>Distribution Center<b className='text-danger'>*</b></small></label>                
              <select className="form-control" name="distributionCenter" onChange={this.myChangeHandler}>                  
              <option value="" selected disabled>No data available</option>
                {
                  this.state.name &&
                  distribution.map((data, index) => {
                    return(                                               
                      <option>{data.distributionCenter}</option>
                    )
                  })                    
                }
              </select>                    
              <i>{this.state.distributionCenterError}</i>
            </div>
          </div>
          {
            this.state.distributionCenter ? 
            <div>
              <div className="row">
                <div className="col-2"/>
                <div className="col-4">                  
                  <label><small>Payment Type<b className='text-danger'>*</b></small></label>                  
                  <select className="form-control" name="paymentData" onChange={this.myChangeHandler}>
                  <option value="" selected disabled>Payment Type</option>
                    {
                      payment.map((data, index) => {
                        return(
                        <option>{data.paymentType}</option>
                        )
                      })
                    }                  
                  </select>                          
                  <i>{this.state.paymentDataError}</i>
                </div>
                <div className="col-4">                  
                  <label><small>Expired Date<b className='text-danger'>*</b></small></label><br/>                    
                  <DatePicker selected={this.state.expiredDate} name="expiredDate" onChange={this.handleChange} className="form-control" dateFormat="yyyy-MM-dd"/>                  
                  <i>{this.state.expiredDateError}</i>
                </div>
              </div>
              <div className="row">
                <div className="col-2"/>
                <div className="col-6">                  
                  <label><small>Note</small></label>
                  <textarea className="form-control" rows="5" id="note" placeholder="Enter Note"></textarea>                                                               
                </div>
              </div>                            
              <hr/>
              <div className="row">
                <div className="col-2 font-weight-bold">
                  <p>Product</p>
                </div>
                <div className="col-6">                  
                  <label><small>Product<b className='text-danger'>*</b></small></label>                    
                  <select className="form-control" name="product" onChange={this.myChangeHandler}>
                  <option value="" selected disabled>Product</option>
                    {
                      product.map((data, index) => {
                        return(
                        <option>{data.product_name}</option>
                        )
                      })
                    }                  
                  </select>                  
                  <i>{this.state.productError}</i>
                </div>
                <div className="col-2">                  
                  <label><small>Unit<b className='text-danger'>*</b></small></label>                  
                  <select className="form-control" name="unit" onChange={this.myChangeHandler}>
                  <option value="" selected disabled>No data available</option>
                    {
                      product.map((data, index) => {
                        return(                          
                        this.state.product === data.product_name &&                            
                          data.units.map((item, i) => {                                            
                            return(                                
                              <option>{item.name}</option>                              
                            )
                          })
                        )
                      })
                    }
                  </select>
                  <i>{this.state.unitError}</i>
                </div>
              </div>
              <div className="row">
                <div className="col-2"/>
                <div className="col-2">                  
                  <label><small>Quality<b className='text-danger'>*</b></small></label>
                  <input type="text" className="form-control" id="quality" placeholder="Enter quality" name="quality" onChange={this.myChangeHandler}/>                                                
                  <i>{this.state.qualityError}</i>
                </div>
                {/* pada price menggunakan onMouseOver untuk merubah state */}
                <div className="col-2">                  
                  <label><small>Price<b className='text-danger'>*</b></small></label>
                  {!this.state.unit && <input type="text" className="form-control" id="price" placeholder="Enter price" name="price"/>}                    
                  {
                      product.map((data, index) => {
                        return(                          
                        this.state.product === data.product_name &&                            
                          data.units.map((item, i) => {                                            
                            return(                 
                              this.state.unit === item.name &&     
                              <input type="text" className="form-control" id="price" placeholder="Enter price" name="price" value={item.price} onMouseOver={this.myChangeHandler}/>
                            )
                          })
                        )
                      })
                    }                  
                  <i>{this.state.priceError}</i>
                </div>
                {/* pada total price menggunakan onMouseOver untuk merubah state */}
                <div className="col-4">            
                  <label><small>Total Price<b className='text-danger'>*</b></small></label>              
                  <input type="text" className="form-control" id="price" placeholder="Enter price" name="totalPrice" disabled={true} 
                    value={this.state.quality * this.state.price} onMouseOver={this.myChangeHandler}
                  />                                                   
                </div>
              </div>
              <div className="row">
                <div className="col-md-6"/>
                <div className="col-md-4">
                <hr className="hr"/>            
                  <span className="float-left">Total Nett Price</span>
                  <span className="float-right">{this.state.totalPrice}</span>            
                </div>
              </div>
            </div> : null
          }          
          <div className="float-right button-position">          
          <button type="button" className="btn btn-light ">CANCEL</button>
          <button 
            type="button" 
            className={this.state.name && this.state.distributionCenter && this.state.paymentData && this.state.product && this.state.unit && this.state.quality ? 
              "btn btn-success btn-sm" : "btn btn-secondary btn-sm"}
            onClick={this.validate}
          >CONFIRM</button>
          </div>
        </div>        
      </div>        
    );
  }
}

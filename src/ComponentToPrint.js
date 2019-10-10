import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import logo from './logo.png';
import './App.css';
import axios from 'axios';
import {data} from './data.js'
var JsBarcode = require('jsbarcode');

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      totalPrice: 0,
      jason:{
        "age" : "24",
        "hometown" : "Missoula, MT",
        "gender" : "male"
      }

    }
  }

  getListFromServer = () => {
  axios.get('https://localhost:44358/api/Receipt')
    .then((response) => {
      console.log(response.data)
    })
  }

  getProductFromServer = () => {
   axios.get('https://localhost:44358/api/Receipt/1')
     .then((response) => {
       console.log(response.data)
     })
   }

   addProduct = () => {
    // axios.post('https://localhost:44358/api/Receipt/Print', "HEJ").then((res)=> console.log(res));
   axios.post('https://127.0.0.1:44358/api/Receipt/Add', {products:this.state.products})
     .then((response) => {
       console.log(response)
     })
   }
  

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/Jebisan/db/data').then((response) => {
      this.setState({ products: response.data })
    }).then(() =>
      this.state.products.forEach(product => {
        this.setState((prevState) => {
          return { totalPrice: prevState.totalPrice += product.PRICE }
        })
      })
    );

    JsBarcode("#barcode", "14192000057464", {
      format: "code39",
      lineColor: "#000",
      width: 1.5,
      height: 35,
      displayValue: true
    });
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="logo" alt="logo" />
        <div className="headerinfo">
          <p>{data.header}</p>
          <p>{data.address}</p>
          <p>Tlf. {data.tlf}</p>
          <p>CVR nr.: {data.cvr}</p>
          <p>Butiksnr.: {data.butiksnr}</p>
        </div>

        <div className='products'>
          <table >
            <tbody>
              {this.state.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className="product" >{product.PRODUCT}</td>
                    <td className="price" >{product.PRICE} DKK</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <table>
          <tbody>
            <tr>
              <td className="totalText"></td>
            </tr>
            <tr>
              <td className="totalText"></td>
            </tr>
            <tr>
              <td className="totalText"></td>
            </tr>
            <tr>
              <td className="totalText">AT BETALE</td>
              <td className="totalPrice" >{(this.state.totalPrice).toFixed(2)} DKK</td>
            </tr>
            <tr>
              <td className="momsText">HERAF UDGØR MOMS</td>
              <td className="momsPrice" >{(this.state.totalPrice / 5).toFixed(2)} DKK</td>
            </tr>
          </tbody>
        </table>

        <table className="footerinfo">
          <tbody>
            <tr className="flex-container">
              <td>Du blev betjent af: {data.betjening}</td>
              <td className="right" >Kasse: {data.kasse}</td>
            </tr>
            <tr className="flex-container">
              <td>Dato: {data.dato}</td>
              <td className="right" >Tid: {data.tid} </td>
            </tr>
            <tr>
              <td className="">Bon nr.: {data.bon}</td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <div className="club">
          <p>****************************************************</p>
          <p>{data.club}</p>
          <p>****************************************************</p>
        </div>

      <div className="bytteinfo" >
        <p>{data.bytteservice[0]}</p>
        <p>{data.bytteservice[1]}</p>
      </div>

        <div className="openinghourscontainer">
          <p className='day'>Åbningstider:</p>
          <div className="day">
          <p>Mandag:</p> <p className="openingtime">{data.openinghours.mandag}</p>
          </div>
          <div className="day">
          <p>Tirsdag  :</p> <p className="openingtime">{data.openinghours.tirsdag}</p>
          </div>
          <div className="day">
          <p>Onsdag:</p> <p className="openingtime">{data.openinghours.onsdag}</p>
          </div>
          <div className="day">
          <p>Torsdag:</p> <p className="openingtime">{data.openinghours.torsdag}</p>
          </div>
          <div className="day">
          <p>Fredag  :</p> <p className="openingtime">{data.openinghours.fredag}</p>
          </div>
          <div className="day">
          <p>Lørdag  :</p> <p className="openingtime">{data.openinghours.lørdag}</p>
          </div>
          <div className="day">
          <p>Søndag:</p> <p className="openingtime">{data.openinghours.søndag}</p>
          </div>
        </div>
        <svg id="barcode"></svg>
        <button onClick={this.getListFromServer} >GET LIST FROM SERVER</button>
        <button onClick={this.getProductFromServer} >GET PRODUCT FROM SERVER</button>
        <button onClick={this.addProduct} >POST!</button>
      </div>
    );
  }
}

const Example = () => {
  const componentRef = useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => < button className="btn" >Print this out!</button>}
        content={() => componentRef.current}
        
      />
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};


export default Example;

import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import axios from 'axios';
import { data } from './data.js'
var JsBarcode = require('jsbarcode');

const ComponentToPrint = () => {

  const [productlines, setProductLines] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/Jebisan/db/data').then((response) => {
      setProductLines(response.data)
    });
    JsBarcode(".barcode").init();
  }, []);


  useEffect(() => {
    productlines.forEach(productline => {
      setTotalPrice(prevPrice => prevPrice + (productline.Product.PRICE*productline.Quantity))
    }
    )
  }, [productlines]);


  const print = () => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:44358/api/Receipt/Add',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      data: ({ "data": productlines }),

    });
  }

  return (
    <div className="mastercontainer">
    <div className="bill">
      <img src={logo} className="logo" alt="logo" />
      <div className="headerinfo">
        <p>{data.header}</p>
        <p>{data.address}</p>
        <p>Tlf. {data.tlf}</p>
        <p>CVR nr.: {data.cvr}</p>
        <p>Butiksnr.: {data.butiksnr}</p>
      </div>

      <div className="productcontainer">
        <table >
          <tbody>
            {productlines.map((productline, index) => {
              return (
                <tr key={index}>
                  <td className="product" >{productline.Quantity} x {productline.Product.PRODUCT}</td>
                  <td className="price" >{(productline.Product.PRICE*productline.Quantity).toFixed(2)} DKK</td>
                </tr>
                
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="totalPriceContainer">
      <table  >
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
            <td className="totalPrice" >{(totalPrice).toFixed(2)} DKK</td>
          </tr>
          <tr>
            <td className="momsText">HERAF UDGØR MOMS</td>
            <td className="momsPrice" >{(totalPrice / 5).toFixed(2)} DKK</td>
          </tr>
        </tbody>
      </table>
      </div>


      <table className="serviceinfocontainer">
        <tbody>
          <tr className="flex-container">
            <td className="left"  >Du blev betjent af: {data.betjening}</td>
          </tr>
          <tr className="flex-container">
            <td className="left"  ></td>
          </tr>
          
          <tr className="flex-container">
            <td className="left">Tidspunkt: {data.tidspunkt}</td>
          </tr>

          <tr>
            
          </tr>
        </tbody>
      </table>
      <p></p>
      <div className="club">
        <p>****************************************************</p>
        <p className="clubtext">{data.club}</p>
        <p>****************************************************</p>
      </div>

      <div className="bytteinfo" >
        <p>{data.bytteservice[0]}</p>
        <p>{data.bytteservice[1]}</p>
      </div>

      <div className="openinghourscontainer">
        <p className='openinghoursheader'>Åbningstider:</p>
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

      <svg className="barcode"
        jsbarcode-format="code39"
        jsbarcode-value={data.bon}
        jsbarcode-width="1"
        jsbarcode-height="35"
      >
      </svg>
      </div>
      <button className="btn" onClick={print} >PRINT!</button>
    </div>
  );
}


export default ComponentToPrint;

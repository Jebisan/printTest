import React, {useState, useEffect} from 'react';
import logo from './logo.png';
import axios from 'axios';
import {data} from './data.js'
var JsBarcode = require('jsbarcode');

 const ComponentToPrint = () => {
  
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/Jebisan/db/data').then((response) => {
      setProducts(response.data)} 
    );
        JsBarcode(".barcode").init();

  }, []);


  useEffect(() => {
    products.forEach(product => {
      setTotalPrice(prevPrice=>prevPrice+product.PRICE)}
      )
  }, [products]);


  const print = () => {
    axios({
     method: 'post',
     url: 'http://127.0.0.1:44358/api/Receipt/Add',
     headers: { 'content-type': 'application/json; charset=utf-8' },
     data: ({"data":products}),
     
   });
  }

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
              {products.map((product, index) => {
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
              <td className="totalPrice" >{(totalPrice).toFixed(2)} DKK</td>
            </tr>
            <tr>
              <td className="momsText">HERAF UDGØR MOMS</td>
              <td className="momsPrice" >{(totalPrice / 5).toFixed(2)} DKK</td>
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
  
        <svg className="barcode"
            jsbarcode-format="code39"
            jsbarcode-value="14192000057464"
            jsbarcode-width="2"
            jsbarcode-height="35"
            >
        </svg>


        

        <button className="btn" onClick={print} >PRINT!</button>
      </div>
    );
  }


export default ComponentToPrint;

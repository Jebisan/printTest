import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import logo from './logo.png'
import './App.css';
import axios from 'axios'


class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      totalPrice: 0,
      moms: 0
    }
  }

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/Jebisan/db/data').then((response) => {
      this.setState({ products: response.data })
    }).then (()=>
    this.state.products.forEach(product => {
      this.setState((prevState)=>{
        return {totalPrice:prevState.totalPrice+=product.PRICE}})
    })
    );
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="logo" alt="logo" />
        <table>
          <tbody>
          <div className="productsContainer" >
            {this.state.products.map((product, index) => {
              return (
                <tr key= {index}>
                  <td className="product" >{product.PRODUCT}</td>
                  <td className="price" >{product.PRICE} DKK</td>
                </tr>
              )})}
          </div>
              <div className="totalContainer">

                
              <tr>
                  <td className="totalText"></td>
                </tr><tr>
                  <td className="totalText"></td>
                </tr><tr>
                  <td className="totalText"></td>
                </tr>


                <tr>
                  <td className="totalText">AT BETALE</td>
                  <td className="price" >{(this.state.totalPrice).toFixed(2)} DKK</td>
                </tr>
                <tr>
                  <td className="momsText">HERAF UDGØR MOMS</td>
                  <td className="momsPrice" >{(this.state.totalPrice/5).toFixed(2)} DKK</td>
                </tr>
                </div>
          </tbody>
        </table>
      </div>
    );
  }
}

const Example = () => {
  const componentRef = useRef();
  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <ReactToPrint
        trigger={() => <button className="btn" >Print receipt</button>}
        content={() => componentRef.current}
        copyStyles={true}
      />

    </div>
  );
};

export default Example;
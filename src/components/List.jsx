import React from 'react'
import { Detector } from "react-detect-offline";
import SingleStock from './SingleStock.jsx'

let getArrow = (trend) => {
  console.log(trend);
  if(trend === 'up'){
    return <span className='up-arrow'>&#8679;</span>
  }
  else if(trend === 'down'){
    return <span className='down-arrow'>&#8681;</span>
  }
  else{
    return '..';
  }
}
const List = (props) => {
  
  return (
    <div className='card column stocklist' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Stocks Status : 
          &nbsp;
          <Detector
            render={({ online }) => (
              <span className={online ? "tag is-success" : "tag is-danger"}>
                {online ? "Live" : "Offline"}
              </span> 
            )}
          />
          &nbsp; &nbsp;
          <button className='button is-small' onClick={props.resetData}>Refresh</button>
        </div>
      </div>
      <div className='card-content'>
        { props.checkstockLoad() ? <p className='is-size-7 has-text-info'>Click on a stock to select/unselect</p> : null }
        <table className='table is-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Value
                <span title='Market trend' className={"icon market-trend"}>
                  {getArrow(props.trend)}
              </span>
              </th>
              <th>History</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>
              {
                let current_stock = props.stocks[stock_name];
                return (
                  <SingleStock
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    stockSelection={props.stockSelection}
                  />
                )
              }
            )}
            { props.checkstockLoad() ? null : <tr><td colSpan='4'>Stocks Loading ... </td></tr> }
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default List;

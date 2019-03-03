import React from 'react'
import List from "./List.jsx";
import StocksGraph from "./StocksGraph.jsx";


const stocksUrl = 'ws://stocks.mnet.website/';

class ShowStock extends React.Component {

  state = {
   stocks: {},
   trend: undefined,
   connectionStatus: false
  }

  componentDidMount = () => {
    this.connection = new WebSocket(stocksUrl);
    this.connection.onmessage = this.saveNewStockValues;
    this.connection.onclose = () => { this.setState({connectionStatus: true}) }
  }

  marketTrendNow = (up_count, down_count) => {
    if(up_count === down_count) return undefined;
    return up_count > down_count ? 'up' : 'down'
  }

  saveNewStockValues = (event) => {
    let result = JSON.parse(event.data);
    let [up, doen,time] = [0, 0, Date.now()];
    let latest_stocks = this.state.stocks
    result.map((stock) =>
    {
      if(this.state.stocks[stock[0]])
      {
        latest_stocks[stock[0]].current_value > Number(stock[1]) ? up++ : doen++;

        latest_stocks[stock[0]].current_value = Number(stock[1])
        latest_stocks[stock[0]].history.push({time: time, value: Number(stock[1])})
      }
      else
      {
        latest_stocks[stock[0]] = { current_value: stock[1], history: [{'time': Date.now(), 'value': Number(stock[1])}], selected: false }
      }
    });
    console.log(latest_stocks)

    this.setState({stocks: latest_stocks, trend: this.marketTrendNow(up, doen)})
  }

  stockSelection = (stock_name) => {
    let latest_stocks = this.state.stocks;
    latest_stocks[stock_name].selected = !latest_stocks[stock_name].selected
    this.setState({ stocks: latest_stocks })
  }

  resetData = () => {
    let latest_stocks = this.state.stocks;
    Object.keys(this.state.stocks).map((stock_name, index) =>
    {
      latest_stocks[stock_name].history = [latest_stocks[stock_name].history.pop()];
    });
    this.setState({ stocks: latest_stocks });
  }

  checkstockLoad = () => {
    return Object.keys(this.state.stocks).length > 0;
  }

  render() {
    return (
      <div className='container'>
        <div className='columns'>
          <List
            stocks={this.state.stocks}
            stockSelection={this.stockSelection}
            resetData={this.resetData}
            trend={this.state.trend}
            checkstockLoad={this.checkstockLoad}
          />
          <StocksGraph stocks={this.state.stocks} />
        </div>

      </div>
    );
  }
}

export default ShowStock;

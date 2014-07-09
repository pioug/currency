/** @jsx React.DOM */

var CurrencyInput = React.createClass({
  getInitialState: function() {
    var rate = this.props.key === 'usd' ? { usd: 1, eur: 10 } : { usd: .1, eur: 1 };
    return {
      rate: rate
    }
  },
  handleChange: function(e) {
    this.props.updateValue({
      currency: this.props.key,
      value: parseFloat(e.target.value)
    });
    this.setState({ value: e.target.value });
  },
  render: function() {
    var value;
    if (this.props.convert.currency === this.props.key) value = this.state.value;
    else value = (this.props.convert.value * this.state.rate[this.props.convert.currency]);
    return (
      <input value={value} placeholder={this.props.key} onChange={this.handleChange} />
    );
  }
});

var CurrencyInputs = React.createClass({
  render: function() {
    var inputs = [] ;
    this.props.currencies.forEach(function(currency) {
      inputs.push(<li><CurrencyInput key={currency} convert={this.props.convert} updateValue={this.props.updateValue}/></li>);
    }, this);
    return (
      <ul>{inputs}</ul>
    );
  }
});

var CurrencyApp = React.createClass({
  getInitialState: function() {
    return {
      currencies: [
        'USD',
        'EUR'
      ],
      convert: { value: 0, currency: '' }
    }
  },
  updateInput: function(convert) {
    this.setState({ convert: convert });
  },
  suggestCurrency: function(e) {
    this.setState({ newCurrencyInput: e.target.value });
  },
  addCurrency: function(e) {
    var nextCurrencies = this.state.currencies.concat(this.state.newCurrencyInput);
    this.setState({ currencies: nextCurrencies });
    e.preventDefault();
  },
  render: function() {
    return (
      <main>
        <CurrencyInputs currencies={this.state.currencies} convert={this.state.convert} updateValue={this.updateInput} />
        <form onSubmit={this.addCurrency}>
          <input onChange={this.suggestCurrency} value={this.state.newCurrencyInput} />
          <button>Add</button>
        </form>
      </main>
    );
  }
});


React.renderComponent(
  <CurrencyApp />,
  document.body
);

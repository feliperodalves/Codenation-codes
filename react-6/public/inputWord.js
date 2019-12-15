class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
  }

  addToList = e => {
    e.preventDefault();
    if (this.state.word.trim() !== '') {
      this.props.onSubmit(this.state.word);
    }
    this.setState({ word: '' });
  };

  handleChange = e => {
    this.setState({
      word: e.target.value,
    });
  };

  render() {
    return (
      <form id="palindrome-form" onSubmit={this.addToList}>
        <input
          id="palindrome-input"
          type="text"
          className="form-control"
          placeholder="Palíndromo"
          data-test="entrada"
          value={this.state.word}
          onChange={this.handleChange}
        />
        <input type="submit" className="d-none" />
      </form>
    );
  }
}

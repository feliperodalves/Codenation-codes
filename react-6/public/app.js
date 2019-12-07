class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
    };
  }

  checkPalindrome = word => {
    const clean = word.replace(/[^A-Z0-9]+/gi, '');
    const reverse = clean
      .split('')
      .reverse()
      .join('');

    return clean === reverse;
  };

  clearList = () => {
    this.setState({
      wordList: [],
    });
  };

  addToList = word => {
    this.setState({
      wordList: [
        ...this.state.wordList,
        {
          word: word,
          flag: this.checkPalindrome(word),
        },
      ],
    });
  };

  render() {
    return (
      <div className="card mb-4 shadow-sm">
        <div className="card-header row no-gutters justify-content-between align-items-center">
          <p className="mb-0">Verificador de Palíndromo</p>
          <form id="form-clearHistory">
            <ClearHistoryButton onSubmit={this.clearList} />
          </form>
        </div>
        <div className="card-body" id="form-inputWord">
          <WordInput onSubmit={this.addToList} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="justify-content-between">
              <th scope="col">Frase</th>
              <th scope="col">Palíndromo</th>
            </tr>
          </thead>
          <TableList list={this.state.wordList} />
        </table>
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);

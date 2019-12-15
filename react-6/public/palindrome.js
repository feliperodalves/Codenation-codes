class Palindrome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { palindrome: false };
  }

  render() {
    return (
      <tr data-verificado="positivo">
        <td>{props.word}</td>
        <td>sim</td>
      </tr>
    );
  }
}

const domContainer = document.querySelector('#form-clearHistory');
ReactDOM.render(<Palindrome />, domContainer);

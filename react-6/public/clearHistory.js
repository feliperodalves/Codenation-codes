class ClearHistoryButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.onSubmit();
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-light btn-small"
        data-test="limpar-dados"
        onClick={this.onClick}
      >
        Apagar Histórico
      </button>
    );
  }
}

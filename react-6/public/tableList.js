class TableList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tbody>
        {this.props.list.map((el) => (
          <tr key={el.word} data-verificado={el.flag ? 'positivo' : 'negativo'}>
            <td>{el.word}</td>
            <td>{el.flag ? 'sim' : 'não'}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

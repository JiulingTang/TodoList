var Table = React.createClass({
  getInitialState: function() {
    return {
     items : [
         {
            id:1,
            subject:"hello",
            content:"hello hello",
            time:"2016.2.3",
            status:"Done"
         },
         {
            id:2,
            subject:"hello",
            content:"hello hello",
            time:"2016.2.4",
            status:"Not Done"
         }
     ],
    };
  },

  render: function() {
    var i=0;

        var trs=this.state.items.map(function(item){
            i++
            return (
            <tr key={item.id}>
                <th scope="row">{i}</th>
                <td>{item.subject}</td>
                <td>{item.content}</td>
                <td>{item.time}</td>
                <td>{item.status}</td>
                <td>
                    <button type="button" class="btn btn-primary">Edit</button>
                    <button type="button" class="btn btn-primary">Delete</button>
                </td>
              </tr>
            );
        })

        return (
        <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Subject</th>
                <th scope="col" styles={{width:"30%"}}>Content</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                {trs}
            </tbody>
        </table>
        );

  }
})

ReactDOM.render(
  <Table
    />,
  document.getElementById('list_table_div')
)



var Table = React.createClass({
    deleteItem: function(id){
        $.post( "/todo_list/item/delete/",{"id":id}, function( data ) {
        var items = this.state.items
        var i=0;
        for (i=0;i<items.length;i++)
        if (items[i].id==id)
        break;
        if (i<items.length)
        items.splice(i,1)
        this.setState({items:items})

    }.bind(this))
  },

  getInitialState: function() {
    var promise = $.getJSON("/todo_list/item/get/")
    var res=null
    var table = this
    promise.then(
        value=>this.setState({items:value}),
        error=>console.log(error)
    )
    return {
     items : [
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
                <td>{item.schedule_time}</td>
                <td>{item.status}</td>
                <td>
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-primary" onClick={()=>this.deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            );
        }.bind(this))

        return (
        <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Subject</th>
                <th scope="col" styles={{width:"30%"}}>Content</th>
                <th scope="col">Expire Time</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                {trs}
                <tr>
                    <td>
                    </td>
                    <td>
                        <input id="subject_input" type="text"/>
                    </td>
                    <td>
                        <textarea id="content_input"></textarea>
                    </td>
                    <td>
                        <input id="expire_time_input"/>
                    </td>
                    <td>
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary">Add</button>
                    </td>
                </tr>
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

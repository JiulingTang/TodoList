

var Table = React.createClass({
    addItem: function(){
        var item = {
            subject: $('#add_subject_input').val(),
            content: $('#add_content_input').val(),
            schedule_time: $('#add_form_datetime input').val(),
            status:false
        }
        $.post( "/todo_list/item/add/",item, function( data ) {
            var items = this.state.items
            console.log(data)
            item.id=data.id
            items.push(item)
            this.setState({items:items})

        }.bind(this))
    },

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

  edit:function(e,item){
    var b = $(e.target)
    //console.log(b)
    //console.log(b.parent().siblings('.value_td').length)
    b.parent().siblings('.value_td').hide()
    b.parent().hide()
    b.parent().siblings('.input_td').show()
    b.parent().siblings('.input_td').find('.subject_input').val(item.subject)
    b.parent().siblings('.input_td').find('.content_input').val(item.content)
    b.parent().siblings('.input_td').find('.form_datetime').find('input').val(item.schedule_time)
  },

  showValue:function(e){
    var b = $(e.target)
    b.parent().siblings('.value_td').show()
    b.parent().siblings('.input_td').hide()
    b.parent().hide()
  },

  update:function(e,id){
    var b = $(e.target)
    var item = {
            id:id,
            subject: b.parent().siblings('.input_td').find('.subject_input').val(),
            content: b.parent().siblings('.input_td').find('.content_input').val(),
            schedule_time: b.parent().siblings('.input_td').find('.form_datetime').find('input').val()
        }
    $.post( "/todo_list/item/update/",item, function( data ) {
            var items = this.state.items
            for (var i=0;i<items.length;i++)
                if (items[i].id==id)
                    Object.assign(items[i],item)
            b.parent().siblings('.value_td').show()
            b.parent().siblings('.input_td').hide()
            b.parent().hide()
            this.setState({items:items})
        }.bind(this))
  },

  changeStatus: function(id,newStatus) {
    console.log(newStatus)
    $.post( "/todo_list/item/changeStatus/",{id:id,status:newStatus}, function( data ) {
            var items = this.state.items
            for (var i=0;i<items.length;i++)
            if (items[i].id==id)
                items[i].status=newStatus
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
                <td className="value_td">{item.subject}</td>
                <td  className="input_td" style={{display:'none'}}>
                    <input className="subject_input" type="text"/>
                </td>
                <td className="value_td">{item.content}</td>
                <td className="input_td" style={{display:'none'}} >
                    <textarea className="content_input"></textarea>
                </td>
                <td className="value_td">{item.schedule_time}</td>
                <td className="input_td" style={{display:'none'}}>
                    <div className="input-append date form_datetime">
                        <input size="16" type="text" value="" readonly/>
                        <span className="add-on"><i className="icon-remove"></i></span>
                        <span className="add-on"><i className="icon-calendar"></i></span>
                    </div>
                </td>
                <td><a href="#" onClick={()=>this.changeStatus(item.id,!item.status)} >{ item.status ? "done": "not done"}</a></td>
                <td className="value_td">
                    <button type="button" className="btn btn-primary" onClick={(e)=>this.edit(e,item)}>Edit</button>
                    <button type="button" className="btn btn-primary" onClick={()=>this.deleteItem(item.id)}>Delete</button>
                </td>
                <td className="input_td" style={{display:'none'}}>
                    <button type="button" className="btn btn-primary" onClick={(e)=>this.update(e,item.id)}>Update</button>
                    <button type="button" className="btn btn-primary" onClick={this.showValue}>Cancel</button>
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
                        <input id="add_subject_input" type="text"/>
                    </td>
                    <td>
                        <textarea id="add_content_input"></textarea>
                    </td>
                    <td>
                        <div id="add_form_datetime" className="input-append date form_datetime">
                            <input size="16" type="text" value="" readonly/>
                            <span className="add-on"><i className="icon-remove"></i></span>
                            <span className="add-on"><i className="icon-calendar"></i></span>
                        </div>
                    </td>
                    <td>
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={this.addItem}>Add</button>
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

setTimeout(function(){
  $(".form_datetime").datetimepicker({
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
  });
  //$(".input_td").hide()
},2000)






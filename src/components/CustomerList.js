import React, {Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios'

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "First Name", field: "firstName", sortable: true, filter: true
      }, {
        headerName: "Last Name", field: "lastName", sortable: true, filter: true
      }, {
        headerName: "Email", field: "email", sortable: true, filter: true
      },
      {
        headerName: "Phone Number", field: "phoneNumber", sortable: true, filter: true
      }],
      rowData: []
    }
  }

  componentDidMount() {
    let url = process.env.API_URL||'http://localhost:5000/'
    url = url + 'customers'
    axios.get(url)
    .then(response => {
      this.setState({rowData: response.data.data})})
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '600px',
        width: '60%'}}
      >
        <AgGridReact
          rowModelType="clientSide"
          pagination={true}
          paginationAutoPageSize={true}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}


export default CustomerList;

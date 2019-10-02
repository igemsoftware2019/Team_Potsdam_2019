import React, { Component } from "react";
import CustomScrollbar from "components/CustomScrollbar";
import TextareaAutosize from "react-textarea-autosize";
import axios from 'axios';
/*
Input field for aa sequence & Input field for Biobricks-ID (request to "http://parts.igem.org/cgi/xml/part.cgi?part=<...>" or better to "http://parts.igem.org/fasta/parts/<...>")
Button sends data
Progress bar/Loading circle
(Tensorflow js)

for help:
html <object>
react js <object>
CSSGenerator <object>
CSS <object>
*/

class Demonstrate extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target)
  }

  handleSubmit(event) {
  }
  componentDidMount() {
    //var request_url = "https://parts.igem.org/cgi/xml/part.cgi?part=" + String(this.state.value);
    var request_url = "http://parts.igem.org/fasta/parts/" + String(this.state.value);
    axios.get(request_url)
      .then(res => {
        console.log(res)
        //const persons = res.data;
        //this.setState({ persons });
      })
  }
  
  render() {
    return (
      <div className="page">
        <CustomScrollbar>
          <div>
            <form onSubmit={this.handleSubmit}>
            <label>
              AA sequence:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
          </div>
          <div>
            <TextareaAutosize
            minRows={3}
            maxRows={6}
              />
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
            <label>
              Biobricks-ID
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="description">
            hswhgsfsg
          </div>
        </CustomScrollbar>
      </div>
    );
  }
}



export default Demonstrate;
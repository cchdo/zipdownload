import React, { Component } from 'react';

import JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';

class View extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: "Hi from stuff"
    }
  }

  componentDidMount(){
    fetch(
      "https://cchdo.ucsd.edu/data/7024/p06_318M20091121su.txt"
    ).then(
      (res) => res.text()
    ).then(
      (text) => this.setState({content: text})
    )
  }

  render() {
    return (
      <pre>
        {this.state.content}
      </pre>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0
    }
  }

  download() {
    let data = [
      "https://cchdo.ucsd.edu/data/12130/318M20091121_hy1.csv",
      "https://cchdo.ucsd.edu/data/12131/318M20091121_nc_hyd.zip",
      "https://cchdo.ucsd.edu/data/12132/318M20091121hy.txt",
      "https://cchdo.ucsd.edu/data/13792/318M20091121_ct1.zip",
      "https://cchdo.ucsd.edu/data/13793/318M20091121_nc_ctd.zip",
      "https://cchdo.ucsd.edu/data/3102/p06_318M20091121do.txt",
      "https://cchdo.ucsd.edu/data/7024/p06_318M20091121su.txt",
    ];
    let zipfile = new JSZip();

    zipfile.file("citation.txt", "Please cite these data as follows: Data from P06 318M20091121")

    data.map((path) => {
      zipfile.file("data/" + path.split("/")[5], fetch(path).then((res) => res.blob()));
    })
    zipfile.generateAsync({type:"blob"}, (meta) => this.setState({progress:meta.percent})).then((blob) => saveAs(blob, "p6_bottle_data_part1.zip"))
  }
  render() {
    return (
      <div className="App">
        <button onClick={() => this.download()}>Download some data!</button>
        <br />
        <progress max="100" value={this.state.progress}></progress>
        <View />
      </div>
    );
  }
}

export default App;

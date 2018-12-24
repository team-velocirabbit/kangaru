import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const remote = require('electron').remote;
const { dialog } = remote;

const DROPDOWN_OPTIONS = [
    'Export', 'Connect'
  ];

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loadExport: false,
          loadConnect: false,
          username: '',
          password: '',
          host: '',
          port: null,
          database: '',
          fileName: '',
          location: '',
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleHostChange = this.handleHostChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
    }
    handleDropdownChange(e) {
        if (e.value === 'Export') {
          this.setState({
            loadConnect: false,
            loadExport: true,
          });
        } else if (e.value === 'Connect') {
          this.setState({
            loadExport: false,
            loadConnect: true,
          });
        }
        console.log('extractImport is ', this.state.extractImport)
        console.log('extractConnect is ', this.state.extractConnect)
      }
    
      handleUsernameChange(e) {
        this.setState({
          username: e.target.value,
        });
      }
    
      handlePasswordChange(e) {
        this.setState({
          password: e.target.value,
        });
      }
    
      handleHostChange(e) {
        this.setState({
          host: e.target.value,
        });
      }
    
      handlePortChange(e) {
        console.log('port is ', e.target.value);
        this.setState({
          port: e.target.value,
        });
      }
    
      handleDatabaseChange(e) {
        this.setState({
          database: e.target.value,
        });
      }

      browseFiles() {
        dialog.showOpenDialog({ 
          properties: ['openFile'] 
        },
        (file) => {
        //   console.log('file is ', file[0])
          this.setState({
            filePath: file[0],
          });
        //   console.log('filePath is ', this.state.filePath)
        });
      }

    render(){
      const { loadExport, loadConnect, fileName } = this.state;
      const exportComp = loadExport ? 
      return(
        <div>
            <form>
                <select>
                        <option value="export">Export</option>
                        <option value="connect">Connect</option>
                    </select>
                    <br/>

                    <label for="filename">Filename</label>
                    <input type="text" id="fname" name="filename" placeholder="Your filename..."></input>
                    <br/>

                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" placeholder="Your location..."></input>
                    <br/>

                    <input type="submit" value="Browse"></input>
                    <br/>

                    <label for="Format">Format</label>
                    <br/>
                    <select>
                        <option value="export">Export</option>
                        <option value="connect">Connect</option>
                    </select>
                </form>
            </div>
        );
    };
};

export default Load;
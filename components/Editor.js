import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      script: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue) {
    console.log('onChange', newValue);
    this.setState({code: newValue
    });


  }

  handleClick(){
    const newCode = this.state.code
    console.log('handleClick');
    this.setState({
    script: newCode});
  }
    
  
  render() {
    console.log(this.state.script);
    const props = this.props;
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div>
        <MonacoEditor
          width="400"
          height="400"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
        <button onClick={this.handleClick}>Save</button>
      </div>
    );
  }
}
	
export default Editor;
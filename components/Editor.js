import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }    
  
  render() {
    const {
      code,
      onCodeChange,
      handleTransformClick
    } = this.props;
    // console.log(this.state.script);
    // const props = this.props;
    // const code = this.state.code;
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
          onChange={onCodeChange}
          editorDidMount={this.editorDidMount}
        />
        <button onClick={() => handleTransformClick()}>Save</button>
      </div>
    );
  }
}
	
export default Editor;
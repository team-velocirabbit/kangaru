import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
constructor(props) {
    super(props);
  }
  
  editorDidMount(editor, monaco) {
    editor.focus();
  }    
  
  render() {
    const {
      code,
      onCodeChange,
      handleTransformClick,
      handleInputChange
    } = this.props;

    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div className="editor">
        <MonacoEditor
          width="100%"
          height="400"
          language="javascript"
          theme="vs-light"
          value={code}
          options={options}
          onChange={onCodeChange}
          editorDidMount={this.editorDidMount}
        />
        <button className="btn waves-effect waves-light green darken-1" style={{  width: '100%', fontSize: '0.8rem' }} onClick={() => handleTransformClick()}>Save</button>
      </div>
    );
  }
}
	
export default Editor;
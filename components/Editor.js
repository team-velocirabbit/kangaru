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
      onCodeChange,
      handleInputChange,
      script
    } = this.props;

    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div className="editor">
        <MonacoEditor
          width="100%"
          height="360"
          language="javascript"
          theme="vs-light"
          value={script}
          options={options}
          onChange={onCodeChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}
	
export default Editor;
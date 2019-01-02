import React, { Component } from 'react';
import * as monaco from 'monaco-editor';
import Editor from './Editor';
import MonacoEditor from 'react-monaco-editor';

const Transform = (props) => {
  const {  
      code, 
      script, 
      onCodeChange, 
      handleTransformClick, 
      handleInputChange } = props;
  return (
    <div className="section">
        <h1>Transform</h1>
        <label htmlFor="npmDependencies">NPM Dependencies</label>
        <br/>
        <Editor 
          code = {code}
          script = {script}
          onCodeChange = {onCodeChange}
          handleTransformClick = {handleTransformClick}
        />
    </div>
  );
};

export default Transform;

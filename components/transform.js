import React, { Component } from 'react';
import * as monaco from 'monaco-editor';
import Editor from './Editor';
import MonacoEditor from 'react-monaco-editor';

const Transform = (props) => {
  const {  
      script, 
      onCodeChange, 
      handleTransformClick, 
      handleInputChange } = props;
  return (
    <div className="transformSection">
        <h1>Transform</h1>
        <label htmlFor="npmDependencies">NPM Dependencies</label>
        <br/>
        <Editor 
          script = {script}
          onCodeChange = {onCodeChange}
          handleTransformClick = {handleTransformClick}
        />
    </div>
  );
};

export default Transform;

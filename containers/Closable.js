import React, { Component } from 'react';
import { Tabs, TabList, Tab, PanelList, Panel, ExtraButton } from 'react-tabtab';
import Popup from 'reactjs-popup';
import * as customStyle from 'react-tabtab/lib/themes/material-design';
import Jobs from '../containers/jobs';
import DefaultTab from '../components/DefaultTab';
import $ from 'jquery';

class Closable extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-use-before-define
    // const tabs = makeData(3);
    this.state = {
      tabs: [{title: 'Welcome!'}],
      activeIndex: 0,
      // array of state for each job
      jobs: [],
      initialRender: true,
      jobName: '',
      modalIsOpen: false,
    };
    this.handleExtraButton = this.handleExtraButton.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
  }

  handleExtraButton() {
    const { tabs, jobs, activeIndex, jobName } = this.state;
    let newTabs;
    if (jobs.length === 0 && tabs.length !== 0) newTabs = [{ title: jobName}];
    else newTabs = [...tabs, { title: jobName}];

    const jobsCopy = jobs.slice();
    jobsCopy.push({});
    if (jobs.length !== 0) jobsCopy[activeIndex] = this['job' + activeIndex.toString()].state;

    this.setState({ tabs: newTabs, activeIndex: newTabs.length - 1, jobs: jobsCopy, initialRender: false });
  }

  handleTabChange(index) {
    const { activeIndex, jobs } = this.state;
    const jobsCopy = jobs.slice();
    jobsCopy[activeIndex] = this['job' + activeIndex.toString()].state;
    this.setState({ activeIndex: index, jobs: jobsCopy });
  }

  handleEdit({ type, index }) {
    this.setState((state) => {
      let { tabs, activeIndex, jobs } = state;
      if (type === 'delete') {
        jobs = [...jobs.slice(0, index), ...jobs.slice(index + 1)];
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return { tabs, jobs, activeIndex };
    });
  }

  handleJobChange(e) {
    this.setState({
      jobName: e.target.value,
    })
  }

  render() {
    const { tabs, activeIndex, initialRender} = this.state;
    const tabTemplate = [];
    const panelTemplate = [];
    if (initialRender) {
      tabs.forEach((tab, i) => {
        const closable = tabs.length > 1;
        tabTemplate.push(<Tab key={i} closable={closable}>{tab.title}</Tab>);
        panelTemplate.push(<Panel key={i}> <DefaultTab/> </Panel>);
      });
    } else {
      tabs.forEach((tab, i) => {
        const closable = tabs.length > 1;
        tabTemplate.push(<Tab key={i} closable={closable}>{tab.title}</Tab>);
        panelTemplate.push(<Panel key={i}><Jobs ref={(job) => this['job' + i.toString()] = job} state={this.state.jobs[i]} name={tab.title} /></Panel>);
      });
    }

    return (
      <div className="tab">
        <Tabs
          onTabEdit={this.handleEdit}
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          customStyle={customStyle}
          ExtraButton={
            <Popup trigger={<button id='newJob'>+ New Job</button>} modal contentStyle={{
              border: 'solid', borderColor: 'lightgrey', borderRadius: '0.5rem', borderWidth: '0.1rem', width: '25%',
            }}>
             {close => (
               <div className='popup'>
                <a className='close' onClick={close} style={{ fontSize: '2.3rem', cursor: 'pointer' }}> &nbsp;&times; </a>
                <div className="input-field col s6 inputField">
                  <input 
                    id='addTab' 
                    type='text' 
                    onChange={this.handleJobChange} 
                    onKeyPress={(event) => {
                      const code = event.keyCode || event.which;
                      if (code === 13) {
                        if (document.getElementById('addTab').value === '') {
                        return window.alert('Please specify name of new job!');
                      }
                      this.handleExtraButton(); 
                      close() 
                      }
                    }
                  }/>
                  <label for='addTab'>Name for new job</label>
                </div>
                <div id='butCont'>
                  <button 
                    id='addBut' 
                    onClick={() => { 
                      if (document.getElementById('addTab').value === '') {
                        return window.alert('Please specify name of new job!');
                      }
                      this.handleExtraButton(); 
                      close() 
                    }}>Add Job</button>
                </div>
              </div>
             )}
            </Popup>
          }>
          <TabList>
            {tabTemplate}
          </TabList>
          <PanelList>
            {panelTemplate}
          </PanelList>
        </Tabs>
      </div>
    );
  }
}

export default Closable;

import React, { Component } from 'react';
import { Tabs, TabList, Tab, PanelList, Panel, ExtraButton } from 'react-tabtab';
import Popup from 'reactjs-popup';
import * as customStyle from 'react-tabtab/lib/themes/material-design';
import Jobs from '../containers/jobs';
import $ from 'jquery';

class Closable extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-use-before-define
    // const tabs = makeData(3);
    this.state = {
      tabs: [],
      activeIndex: 0,
      // array of state for each job
      jobs: [],
      jobName: '',
    };
    this.handleExtraButton = this.handleExtraButton.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
  }
  
  handleExtraButton() {
    const { tabs, jobs, activeIndex, jobName } = this.state;
    console.log('job name is ', this.state.jobName)
    const newTabs = [...tabs, { title: jobName /* content: <div><Jobs propState={ }/></div> */}];
    const jobsCopy = jobs.slice();
    jobsCopy.push({});
    if (jobs.length !== 0) jobsCopy[activeIndex] = this['job' + activeIndex.toString()].state;

    console.log('BEFORE ADDING TAB ', this.state.jobs)
    this.setState({ tabs: newTabs, activeIndex: newTabs.length - 1, jobs: jobsCopy});
  }

  handleTabChange(index) {
    const { activeIndex, jobs } = this.state;
    const jobsCopy = jobs.slice();
    jobsCopy[activeIndex] = this['job' + activeIndex.toString()].state;


  console.log('current state is ', this.state.jobs)


    this.setState({ activeIndex: index, jobs: jobsCopy });
  }

  handleEdit({ type, index }) {
    this.setState((state) => {
      let { tabs, activeIndex } = state;
      if (type === 'delete') {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return { tabs, activeIndex };
    });
  }

  handleJobChange(e) {
    this.setState({
      jobName: e.target.value,
    })
  }


  render() {
    const { tabs, activeIndex } = this.state;
    const tabTemplate = [];
    const panelTemplate = [];
    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(<Tab key={i} closable={closable}>{tab.title}</Tab>);
      panelTemplate.push(<Panel key={i}> <Jobs ref={(job) => this['job' + i.toString()] = job} state={this.state.jobs[i]} /> </Panel>);
    });

    console.log('JOBS IS ', this.state.jobs)

    return (
      <div className="tab">
        <Tabs
          onTabEdit={this.handleEdit}
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          customStyle={customStyle}
          ExtraButton={ 
            <Popup trigger={<button>+ New Job</button>} position='right center'>
            <div>
              <input id='addTab' type='text' onChange={this.handleJobChange}/>
              <label for='addTab'>Name for this job</label>
              <ExtraButton onClick={this.handleExtraButton}>Add Job</ExtraButton>
            </div>
            </Popup>
          }
        >
          <TabList>
            {tabTemplate}
          </TabList>
          <PanelList>
            {panelTemplate}
          </PanelList>
          {/* <Popup trigger={<button>+</button>} position="right center">
            <div>
              <input id='addTab' type='text' onChange={this.handleJobChange}/>
              <label for='addTab'>Name for this job</label>
              <ExtraButton onClick={this.handleExtraButton}>Add Job</ExtraButton>
            </div>
          </Popup> */}
        </Tabs>
      </div>
    );
  }
}
// const makeData = (number, titlePrefix = 'Tab') => {
//   const data = [];
//   for (let i = 0; i < number; i++) {
//     data.push({
//       title: `${titlePrefix} ${i}`,
//       content:
//         <div>
//           <Jobs ref={(job0) => { this.job0 = job0 }} />
//         </div>
//     });
//   }
//   return data;
// };
export default Closable;




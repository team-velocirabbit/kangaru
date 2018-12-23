import React, {Component} from 'react';

class Queue extends Component {
    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>Job#</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                    <tr>
                        <td>2067</td>
                        <td>Friday, Dec 21, 2018 3:45 PM</td>
                        <td>30 sec.</td>
                        <td>Done</td>
                        <td></td>
                    </tr>
            </table>
            </div>
        );
    };
};

export default Queue;
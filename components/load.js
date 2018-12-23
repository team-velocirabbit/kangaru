import React, {Component} from 'react';

class Load extends Component {
    render(){
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
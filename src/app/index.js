import clock from 'clock';
import document from 'document';
// import { preferences } from 'user-settings';
import React from 'react';
import ReactDOM from 'react-dom';

// import * as util from '../common/utils';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <section id="timeZone">
          <text id="timeLabel" />
          <text id="secondLabel" />
        </section>
      </React.Fragment>
    );
  }
}

const app = ReactDOM.render(<App />, document.getElementById('react-root')); // eslint-disable-line react/no-render-return-value

clock.granularity = 'seconds';
clock.ontick = (evt) => {
  app.setState({
    date: evt.date
  });

  // let hours = today.getHours();

  // if (preferences.clockDisplay === '12h') {
  //   // 12h format
  //   hours = hours % 12 || 12;
  // }

  // clockLabel.text = `${util.zeroPad(hours)}:${util.zeroPad(today.getMinutes())}`;
  // secondLabel.text = `${util.zeroPad(today.getSeconds())}`;
};

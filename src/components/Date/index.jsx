import React from 'react';
import style from './style.scss';


class DateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <div className={style.title}>时间</div>
        <div className={style.title}>
          {date.toLocaleTimeString()}
        </div>
      </div>
    );
  }
}
export default DateComponent;

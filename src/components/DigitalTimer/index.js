import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerStarted: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <p className="timer-limit-label">Set Timer Limit</p>
        <div className="limit-control-container">
          <button
            type="button"
            className="limit-button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-count">{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="limit-button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerStarted: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerStarted,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
  }

  renderTimerController = () => {
    const {isTimerStarted} = this.state
    const altImgClassName = isTimerStarted ? 'pause icon' : 'play icon'
    const imgUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="start-stop-container">
        <button
          type="button"
          className="control-button"
          onClick={this.onStartOrPauseTimer}
        >
          <img src={imgUrl} alt={altImgClassName} className="control-icon" />
          <p className="control-name">{isTimerStarted ? 'Pause' : 'Start'}</p>
        </button>

        <button
          type="button"
          className="control-button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="control-icon"
          />
          <p className="control-name">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerStarted} = this.state
    const timerStatus = isTimerStarted ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer">
            <div className="timer-details">
              <h1 className="timer-count">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controller-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

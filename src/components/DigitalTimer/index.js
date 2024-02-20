// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimitInMinitues: 25,
    timerLimitInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  onClcikMinusButton = () => {
    const {timerLimitInMinitues} = this.state
    if (timerLimitInMinitues > 0) {
      this.setState(prevState => ({
        timerLimitInMinitues: prevState.timerLimitInMinitues - 1,
      }))
    }
  }

  onClcikPlusButton = () => {
    this.setState(prevState => ({
      timerLimitInMinitues: prevState.timerLimitInMinitues + 1,
    }))
  }

  onClickResetButton = () => {
    this.setState({
      isTimerRunning: false,
      timerLimitInMinitues: 25,
      timerLimitInSeconds: 0,
    })
    this.clearTimeInterval()
  }

  onIncrementTimerLimitSeconds = () => {
    const {timerLimitInMinitues, timerLimitInSeconds} = this.state
    const isTimerCompleted = timerLimitInSeconds === timerLimitInMinitues * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerLimitInSeconds: prevState.timerLimitInSeconds + 1,
      }))
    }
  }

  onClcikStartOrPauseButton = () => {
    const {isTimerRunning, timerLimitInMinitues, timerLimitInSeconds} =
      this.state
    const isTimerCompleted = timerLimitInSeconds === timerLimitInMinitues * 60

    if (isTimerCompleted) {
      this.setState({timerLimitInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.onIncrementTimerLimitSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getDigitalTimerInSeconds = () => {
    const {timerLimitInMinitues, timerLimitInSeconds} = this.state
    const totalBalancedSeconds = timerLimitInMinitues * 60 - timerLimitInSeconds
    const minitues = Math.floor(totalBalancedSeconds / 60)
    const seconds = Math.floor(totalBalancedSeconds % 60)
    const stringFiedMinitues = minitues > 9 ? minitues : `0${minitues}`
    const stringFiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringFiedMinitues}:${stringFiedSeconds}`
  }

  render() {
    const {isTimerRunning, timerLimitInSeconds, timerLimitInMinitues} =
      this.state
    const startorpauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startorpauseAltTxt = isTimerRunning ? 'pause icon' : 'play icon'
    const startorpauseTxt = isTimerRunning ? 'Pause' : 'Start'
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    const digitalTimer = this.getDigitalTimerInSeconds()
    const isBtnDisabled = timerLimitInSeconds > 0

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="digital-timer">{digitalTimer}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>

          <div className="setup-timer-container">
            <div className="start-reset-container">
              <div className="start-pause-button-container">
                <button
                  className="start-pause-button"
                  type="button"
                  onClick={this.onClcikStartOrPauseButton}
                >
                  <img
                    src={startorpauseImgUrl}
                    alt={startorpauseAltTxt}
                    className="play-pause-icon"
                  />
                  <p className="start-pause">{startorpauseTxt}</p>
                </button>
              </div>

              <div className="reset-button-container">
                <button
                  className="reset-button"
                  type="button"
                  onClick={this.onClickResetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-icon"
                  />
                  <p className="reset">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-timer-limit">Set Timer Limit</p>
            <div className="set-timer-limit-container">
              <button
                className="minus-btn"
                type="button"
                onClick={this.onClcikMinusButton}
                disabled={isBtnDisabled}
              >
                -
              </button>
              <p className="minitues">{timerLimitInMinitues}</p>
              <button
                className="plus-btn"
                type="button"
                onClick={this.onClcikPlusButton}
                disabled={isBtnDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

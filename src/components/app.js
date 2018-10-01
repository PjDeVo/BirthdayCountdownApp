import React, { Component } from 'react';
import Picker from './picker';
import Button from './button';
import Clock from './clock';
import ChangeDate from './changeDate';
import LargeText from './largeText'
import moment from 'moment';


export default class App extends Component {

    constructor(props) {
        super(props);

        this.timer = 0
        this.state = {
            active: false,
            startDate: moment(),
            timeRemaining: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
        this.handleGenerate = this.handleGenerate.bind(this)
    }

    handleChange = function (date) {
        console.log('APP JS HANDLECHANGE', date._d)
        clearInterval(this.timer);
        this.setState({
            startDate: date
        });
    }.bind(this)

    handleGenerate = function () {
        this.setState({ active: true });

        var bday = this.state.startDate.toDate().getTime();



        var countDownDate = bday.getTime();
        var today = new Date();
        var currentMonth = today.getMonth();
        var birthMonth = bday.getMonth();

        if (birthMonth > currentMonth) {
            bday.setFullYear(today.getFullYear())
        } else if (birthMonth < currentMonth) {
            bday.setFullYear(today.getFullYear() + 1)
        } else if (birthMonth === currentMonth) {
            var currentDay = today.getDate();
            var birthDay = bday.getDate();

            if (birthDay > currentDay) {
                bday.setFullYear(today.getFullYear())
            } if (birthDay <= currentDay) {
                bday.setFullYear(today.getFullYear() + 1)
            }
        }

        //Update the count down every 1 second

        this.timer = setInterval(function () {

            //get todays date and time

            var now = today.getTime();
            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an elemt with id="demo"

            const time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            const timeRemaining = {
                days,
                hours,
                minutes,
                seconds
            }
            this.setState({ timeRemaining });


            //if the count down is over, write some text

            if (distance < 0) {
                clearInterval(this.timer);
                //document.getElementbyId("demo").innterHtml = "EXPIRED"
            }
        }.bind(this), 1000);
    }.bind(this)

    renderItems = function () {
        if (this.state.active) {
            return [
                <Clock timeRemaining={this.state.timeRemaining} />,
                ChangeDate('Change Date', () => this.setState({ active: false })),
                LargeText('04/03'),
                <label className="grid__remaining"> Remaining until your 21st Birthday </label>
            ]
        } else {
            return [
                <Picker startDate={this.state.startDate} callback={(date) => this.handleChange(date)} />,
                Button('Generate Countdown', () => this.setState({ active: true }))
            ]
        }
    }.bind(this)

    render() {


        return (
            <div className="grid">
                <hi className="grid__title"> Birthday Countdown </hi>
                <div className="grid__skew-dark-two"> </div>
                <div className="grid__skew-dark-three"> </div>
                <div className="grid__skew-light-one"> </div>
                <div className="grid__skew-light-two"> </div>
                <div className="grid__skew-light-three-box"> </div>


                {this.renderItems()}
            </div>
        );
    }
}

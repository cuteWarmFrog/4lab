import {Slider} from "primereact/slider";
import {Dropdown} from "primereact/dropdown";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectPassword, setAlertMessage} from "../Auth/AuthSlice";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './FineSettings.css'
import {getPoints, selectPoints, sendPoint} from "../Main/MainSlice";

const rValues = [
    {label: -2, value: -2},
    {label: -1.5, value: -1.5},
    {label: -1, value: -1},
    {label: -0.5, value: -0.5},
    {label: 0, value: 0},
    {label: 0.5, value: 0.5},
    {label: 1, value: 1},
    {label: 1.5, value: 1.5},
    {label: 2, value: 2}
];

export const FineSettings = () => {

    const dispatch = useDispatch();

    const login = useSelector(selectLogin);
    const password = useSelector(selectPassword);

    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [rValue, setRValue] = useState(1);

    const onChangeXSlider = (e) => {
        setXValue(e.value);
    }

    const onChangeYSlider = (e) => {
        setYValue(e.value);
    }

    const onChangeRDropDown = (e) => {
        setRValue(e.value);
    };


    const sendThisShit = () => {
        let x = getX() / 2;
        let y = getY();
        let r = getR();

        console.log(x, y, r);

        let message = '';
        if (x < -2 || x > 2) {
            message += 'X must be between -2 and 2 \n';
        }

        if (y < -5 || y > 5) {
            message += 'Y must be between -2 and 2 \n'
        }

        if (r <= 0 || r > 2) {
            message += 'What the hell is R value? \n Are you fucking kidding me?';
        }

        console.log(message);

        if (message !== '') {
            dispatch(setAlertMessage(message));
        } else {
            let user = {login, password};
            let point = {x, y, r};
            dispatch(sendPoint(user, point));
            dispatch(getPoints(user));
        }

    }

    const getX = () => {
        return round(xValue);
    }

    const getY = () => {
        return round(yValue);
    }

    const getR = () => {
        return round(rValue);
    }

    const round = (x) => {
        return Math.round(x * 100) / 100;
    }

    return (
        <div className="fine-settings col">

            <div className="settings container row">
                <div className="col">
                    <h3>Choose X</h3>
                    <label htmlFor="xInput">{xValue / 2}</label>
                    <Slider
                        id="xInput"
                        onChange={e => onChangeXSlider(e)}
                        style={{width: '15em'}}
                        animate={true}
                        step={1}
                        value={xValue}
                        min={-4}
                        max={4}>
                    </Slider>
                </div>

                <div className="col">

                    <h3>Choose Y</h3>
                    <label htmlFor="yInput">{yValue}</label>
                    <Slider
                        id="yInput"
                        style={{width: '15em'}}
                        orientation="horizontal"
                        onChange={e => onChangeYSlider(e)}
                        animate={true}
                        step={1}
                        value={yValue}
                        min={-5}
                        max={5}>
                    </Slider>
                </div>

                <div className="col">
                    <h3>Choose R</h3>
                    <Dropdown
                        style={{width: '10em'}}
                        id="rInput"
                        auto
                        onChange={e => onChangeRDropDown(e)}
                        class="dropdown"
                        options={rValues}
                        value={rValue}
                    />
                </div>

            </div>
            <div className={"container"}>
                <button onClick={sendThisShit} className="btn btn-success">Send this shit</button>
            </div>


        </div>
    )
}
/* ------------------ LIBRARY AND DATA IMPORTS ------------------ */

/* Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
// Mediaquery : up to 480px is mobile, up to 768px is tablet, and above is laptop

/* Stylesheet */
import './index.css';

/* Data */
import graphics from './graphics.js';
const data = require('./data.json');

/* ------------------ CUSTOMIZED COMPONENTS ------------------ */

/* Planet Tab */
function Tab(props) {
    return (
            <button className={"tab " + props.value} onClick={props.onClick}>
                <MediaQuery minWidth={680}>
                    <h5>{props.value}</h5>
                </MediaQuery>
                <MediaQuery maxWidth={680}>
                    <span className="circle" style={{backgroundColor: props.color}}/>
                    <h3>{props.value}</h3>
                </MediaQuery>
            </button>
    )
}

/* Option (Overview, Internal, Geology) */
function Option(props){
    return (
        <div id = "options">
            <MediaQuery minWidth={680}>
                <button className="option" onClick={props.onClick}
                        style={{backgroundColor: props.color}}>
                    <h3>
                        <span className="optionID">{props.value[0]}</span>
                        {props.value[1]}
                    </h3>
                </button>
            </MediaQuery>
            <MediaQuery maxWidth={680}>
                <button className="option" onClick={props.onClick}
                        style={{borderColor: props.color}}>
                    <h3>{props.value[1].split(" ")[props.value[1].split(" ").length-1]}</h3>
                </button>
            </MediaQuery>
        </div>
    );
}

/* Box (Rotation, Revolution, Radius, Average Temp) */
function Box(props){
    return (
        <div className="box">
            <h4 className="boxName">{props.value[0]}</h4>
            <h2 className="boxValue">{props.value[1]}</h2>
        </div>
    );
}

/* Planet Image */
// props.value[0] is planet choice, and props.value[1] is option choice
function PlanetImage(props){
    if(props.value[1] < 2) {
        return (
            <div className="planetImages">
                <img className="planetImage"
                     src={graphics[props.value[0]].img[props.value[1]]}
                     alt={data[props.value[0]].name}
                />
            </div>
        );
    } else {
        return (
            <div className="planetImages">
                <img className="planetImage"
                    src={graphics[props.value[0]].img[0]}
                    alt={data[props.value[0]].name}
                />
                <div id = "geodiv">
                    <img className="geologyImage"
                         src={graphics[props.value[0]].img[2]}
                         alt={data[props.value[0]].name + " Geology"}
                    />
                </div>
            </div>
        );
    }
}

/* Mobile Menu Icon */
function MenuIcon(props){
    return (
        <div className="menuIcon" onClick={props.onClick}/>
    )
}

/* ------------------ PAGE ------------------*/

/* Page */
class Page extends React.Component {

    /* Constructor with states (planet, option) */
    constructor(props) {
        super(props);
        this.state = {
            planet: 0,
            option: 0,
        };
    }

    /* Click Handlers for Tab and Option */
    handleClickTab(value){
        this.setState({
            planet: value,
            option: 0,
        });
    }
    handleClickOption(value){
        this.setState({
            option: value,
        });
    }

    /* Renderers for Customized Components */
    renderTab(i){
        return (
            <Tab
                value = {data[i].name}
                onClick = {() => this.handleClickTab(i)}
                color = {graphics[i].color}
            />
        );
    }
    renderOption(id, name){
        let idRender = "0" + (id+1);
        return (
            <Option
                value = {[idRender, name]}
                onClick = {() => this.handleClickOption(id)}
                color = {(id==this.state.option)?graphics[this.state.planet].color:"transparent"}
            />
        );
    }
    renderBoxes(i){
        return (
            <div id = "boxes">
                <Box value = {["Rotation time", data[i].rotation]}/>
                <Box value = {["Revolution time", data[i].revolution]}/>
                <Box value = {["Radius", data[i].radius]}/>
                <Box value = {["Average temp", data[i].temperature]}/>
            </div>
        );
    }
    renderTabs(){
        return(
            <div id = 'tabs'>
                {this.renderTab(0)}
                {this.renderTab(1)}
                {this.renderTab(2)}
                {this.renderTab(3)}
                {this.renderTab(4)}
                {this.renderTab(5)}
                {this.renderTab(6)}
                {this.renderTab(7)}
            </div>
        );
    }
    renderOptions(){
        return(
            <div id = 'options'>
                {this.renderOption(0, 'overview')}
                {this.renderOption(1, 'internal structure')}
                {this.renderOption(2, 'surface geology')}
            </div>
        );
    }
    renderPlanetImages(){
        return (
            <PlanetImage
                value = {[this.state.planet, this.state.option]}
            />
        );
    }

    renderMenuIcon(){
        return(
            <MenuIcon onClick = {() => this.renderTabs()}/>
        )
    }

    /* Renderers for Header and Content */
    renderHeader(){
        return (
            <div>
                <div id = 'header'>
                    <div id = 'title'>
                        THE PLANETS
                    </div>
                    <MediaQuery minWidth={680}>
                        {this.renderTabs()}
                    </MediaQuery>
                    <MediaQuery maxWidth={680}>
                        {/*<MenuIcon/>*/}
                        {this.renderTabs()}
                        {this.renderOptions()}
                    </MediaQuery>
                </div>
                <div className="hLine"/>
            </div>
        )
    }
    renderContent(i){
        let text;
        let src;

        switch (this.state.option) {
            case 0:
                text = data[i].overview.content;
                src = data[i].overview.source;
                break;
            case 1:
                text = data[i].structure.content;
                src = data[i].structure.source;
                break;
            case 2:
                text = data[i].geology.content;
                src = data[i].geology.source;
                break;
            default:
        }


        return (
            <div id = 'content'>
                <div id = 'middle'>
                    <div id = 'leftright'>
                        <div id = 'left'>
                            {this.renderPlanetImages()}
                        </div>
                        <div id = 'right'>
                            <div id = 'rightcontent'>
                                <h1>{data[this.state.planet].name}</h1>
                                <div className="text">
                                    {text}
                                </div>
                                <div className="wikipedia">
                                    Source : <a href={src}>Wikipedia</a>
                                    <div className="wikiarrow"/>
                                </div>
                            </div>
                            <MediaQuery minWidth = {680}>
                                <div id = 'rightoptions'>
                                    {this.renderOptions()}
                                </div>
                            </MediaQuery>
                        </div>
                    </div>
                </div>
                <div id = 'bottom'>
                    {this.renderBoxes(i)}
                </div>
            </div>
        );
    }

    render() {
        return(
            <div id="fullpage">
                {this.renderHeader()}
                {this.renderContent(this.state.planet)}
            </div>

        );
    }
}

ReactDOM.render(<Page />, document.getElementById("root"));


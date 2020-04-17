import * as THREE from "three";
import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import exampleModel from "../../assets/ch.mtl";
import exampleTexture from "../../assets/ch.obj";
import Comptwo from "../comptwo"
import "./demo.css"

class DemoScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cameraPosition: new THREE.Vector3(0, 300, 750),
      groupRotation: new THREE.Euler(0, 0, 0),
      scene: {},
      color: "#313139",
      activeTab: 1,
      rate: "$28,095",
      check:false,
      rate2:"$58,068"
    };
  }

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
  }

  componentWillMount() {
    this.targetRotationOnMouseDown = 0;
    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.targetRotation = 0;

    this.onDocumentMouseDown = event => {
      event.preventDefault();

      document.addEventListener('mousemove', this.onDocumentMouseMove, false);
      document.addEventListener('mouseup', this.onDocumentMouseUp, false);
      document.addEventListener('mouseout', this.onDocumentMouseOut, false);

      let windowHalfX = document.body.clientWidth / 2;

      this.mouseXOnMouseDown = event.clientX - windowHalfX;
      this.targetRotationOnMouseDown = this.targetRotation;
    };

    this.onDocumentMouseMove = event => {
      let windowHalfX = document.body.clientWidth / 2;

      this.mouseX = event.clientX - windowHalfX;

      this.targetRotation =
        this.targetRotationOnMouseDown +
        (this.mouseX - this.mouseXOnMouseDown) * 0.02;
    };

    this.onDocumentMouseUp = () => {
      document.removeEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false
      );
      document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
    };

    this.onDocumentMouseOut = () => {
      document.removeEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false
      );
      document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
    };
  }

  updateScene = () => {
    let groupRotationY = (this.state.groupRotation) ? this.state.groupRotation.y : 0;
    let groupRotation;

    if (Math.abs(groupRotationY - this.targetRotation) > 0.0001) {
      groupRotation = new THREE.Euler(
        0,
        groupRotationY + (this.targetRotation - groupRotationY) * 0.05,
        0
      );
    }

    this.setState({
      groupRotation
    });
  }

  color(colors) {
    this.setState({ color: colors })
  }
  _handleChange(key) {
    this.setState({ check: key })
  }

  render() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <div >

        <div className="child1">
          <h1>CHOOSE YOUR VEHICLE</h1>
          <p>Available in multiple trims. Select a vehicle to explore.</p>
        </div>


        <div className="child2">
          <div style={{ display: "flex", width: "100%", }}>
            <div style={{ width: "33%", textAlign: "center" }} onMouseOver={() => this.setState({ activeTab: 1 })}>
              <img width="60%" src="data:image/jpeg;base64,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" />
              <p style={{ fontWeight: "bold", borderBottom: this.state.activeTab === 1 ? '5px solid red' : "none", opacity: this.state.activeTab === 1 && 1 || 0.5, color: this.state.activeTab === 1 ? "red" : "black" }}>SXT</p>
            </div>
            <div style={{ width: "33%", textAlign: "center" }} onMouseOver={() => this.setState({ activeTab: 2 })}>
              <img width="60%" src="data:image/jpeg;base64,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" />
              <p style={{ fontWeight: "bold", borderBottom: this.state.activeTab === 2 ? '5px solid red' : "none", opacity: this.state.activeTab === 2 && 1 || 0.5, color: this.state.activeTab === 2 ? "red" : "black" }}>GT</p>
            </div>
            <div style={{ width: "33%", textAlign: "center" }} onMouseOver={() => this.setState({ activeTab: 3 })}>
              <img width="60%" src="data:image/jpeg;base64,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" />
              <p style={{ fontWeight: "bold", borderBottom: this.state.activeTab === 3 ? '5px solid red' : "none", opacity: this.state.activeTab === 3 && 1 || 0.5, color: this.state.activeTab === 3 ? "red" : "black" }}>R/T</p>
            </div>
          </div>
        </div>

        {this.state.activeTab === 1 &&
          <div style={{borderBottom:'1px solid red',}}>
            <div style={{ paddingLeft: "7%" }} >
              <h1>CHALLENGER SXT</h1>
              <p style={{ paddingLeft: "5%", fontWeight: "bold" }}>MSRP* starting at {this.state.check===false  ?this.state.rate :this.state.rate2 ||this.state.check===true?this.state.rate2:this.state.rate}</p>
              <label className="switch" style={{marginLeft:"10%"}}>
  <input type="checkbox"  onClick={()=>this.setState({check:!this.state.check})}/>
  <span className="slider round"></span>
</label> AWD
            </div>
            <Comptwo />
          </div>
        }


        {this.state.activeTab === 2 &&
          <div style={{borderBottom:'1px solid Black'}}>
            <div style={{ paddingLeft: "7%" }} >
              <h1>CHALLENGER GT</h1>
              <p style={{ paddingLeft: "5%", fontWeight: "bold" }}>MSRP* starting at {this.state.check===false  ?this.state.rate :this.state.rate2 ||this.state.check===true?this.state.rate2:this.state.rate}</p>
              <label className="switch" style={{marginLeft:"10%"}}>
  <input type="checkbox"  onClick={()=>this.setState({check:!this.state.check})}/>
  <span className="slider round"></span>
</label> AWD
            </div>
            <Comptwo />
          </div>
        }


        {this.state.activeTab === 3 &&
          <div style={{borderBottom:'1px solid Black'}}>
            <div style={{ paddingLeft: "7%" }} >
              <h1>CHALLENGER R/T</h1>
              <p style={{ paddingLeft: "5%", fontWeight: "bold" }}>MSRP* starting at {this.state.check===false  ?this.state.rate :this.state.rate2 ||this.state.check===true?this.state.rate2:this.state.rate}</p>
            <label className="switch" style={{marginLeft:"10%"}}>
  <input type="checkbox"  onClick={()=>this.setState({check:!this.state.check})}/>
  <span className="slider round"></span>
</label> AWD
            </div>
            <Comptwo />
          </div>
        }
      </div>
    );
  }
}

export default DemoScene;

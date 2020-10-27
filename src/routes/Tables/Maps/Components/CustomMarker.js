import React, { Component } from 'react';

import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";

let activeIcon = { icon: `http://maps.google.com/mapfiles/ms/icons/pink-dot.png`, scaledSize: 100 };
let defaultIcon = { icon: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`, scaledSize: 100 };

class CustomMarker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPatient: '',
            open: false
        }
    }
    viewInfo = (event) => {

        this.setState({ open: !this.state.open })
    };
    closeInfo = (event) => {
        
        this.setState({ open: false })
       
    };
    render() {
        let { patient, position, key } = this.props;
        console.log('props ', this.state);

        return (
            <>
                {
                    (this.state.open == true || this.props.open) && <InfoWindow

                        position={{ lat: (patient.lat), lng: patient.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{patient.name} {patient.streetNr} {patient.zipCode} {patient.city}</span>
                        </div>
                    </InfoWindow>
                }
                {
                    patient.id ? <Marker
                        options={this.props.open ? activeIcon : defaultIcon}
                        key={key}
                        name={'Dolores park'}
                        position={position}
                        onClick={this.viewInfo}
                    /> : <Marker
                            key={key}
                            name={'Dolores park'}
                            position={position}
                            onClick={this.viewInfo}

                        />
                }
            </>

        )
    }

}
export default CustomMarker;
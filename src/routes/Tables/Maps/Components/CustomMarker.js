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
        console.log('event');
        this.setState({ open: !this.state.open })
    };
    closeInfo = (event) => {
        console.log('event');
        this.setState({ open: false })
    };
    render() {
        let { patient, position, key } = this.props;

        return (
            <>
                {
                    this.state.open == true && <InfoWindow

                        position={{ lat: (patient.lat), lng: patient.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{patient.name} {patient.streetNr} {patient.zipCode} {patient.city}</span>
                        </div>
                    </InfoWindow>
                }
                {
                    patient.id ? <Marker
                        options={patient.id == this.state.selectedPatient ? activeIcon : defaultIcon}
                        key={key}
                        name={'Dolores park'}
                        position={position}
                        onMouseOver={this.viewInfo}
                    /> : <Marker
                            key={key}
                            name={'Dolores park'}
                            position={position}
                            onMouseOver={this.viewInfo}

                        />
                }
            </>

        )
    }

}
export default CustomMarker;
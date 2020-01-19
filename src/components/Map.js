import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import styled from 'styled-components';

const ReactMapboxGlMap = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FtdWVsdHNvIiwiYSI6ImNrNWs3Z2s3YjBiN3Mza241MTkweDNsemEifQ.HAKopF1Q8laHm4hK6NR51A'
});

export const Map = () => {
  return (
    <ReactMapboxGlMap
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={[-73.58781, 45.50884]}
      zoom={[13]}
    >
      <TrashMarker coordinates={[-73.58781, 45.50884]} color={' #f56565'} />
      <TrashMarker coordinates={[-73.58781, 45.50984]} color={' #ECC94B'} />
      <TrashMarker coordinates={[-73.58731, 45.50894]} color={' #48BB78'} />
    </ReactMapboxGlMap>
  );
};

const TrashMarker = props => {
  return (
    <Marker coordinates={props.coordinates} anchor="center">
      <Dot color={props.color} />
    </Marker>
  );
};

const Dot = styled.div`
  background-color: white;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  border: ${props => `5px solid ${props.color}`};
`;

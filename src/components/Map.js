import React, { Component, useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import styled from 'styled-components';
import firebase from 'firebase';
import tinygradient from 'tinygradient';

import mobilierUrbainGP from '../mobilierurbaingp.json';

const ReactMapboxGlMap = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FtdWVsdHNvIiwiYSI6ImNrNWs3Z2s3YjBiN3Mza241MTkweDNsemEifQ.HAKopF1Q8laHm4hK6NR51A'
});

firebase.initializeApp({
  apiKey: 'AIzaSyAjyJ-T2RiCOJSFBHEDN3kpBQT3wM39XqY',
  authDomain: 'clean-d5b63.firebaseapp.com',
  databaseURL: 'https://clean-d5b63.firebaseio.com',
  projectId: 'clean-d5b63',
  storageBucket: 'clean-d5b63.appspot.com',
  messagingSenderId: '760378273796',
  appId: '1:760378273796:web:25c6a75c3fdafbabf98551'
});
const firestore = firebase.firestore();

const POLY_LONG = -73.613097;
const POLY_LAT = 45.505181;
const BOX_SIZE = 0.015;

var colorStops = [' #f56565', ' #ECC94B', ' #48BB78'];

var gradient = tinygradient(colorStops);
var colors = gradient.rgb(101);

export const Map = () => {
  const [polyTrashData, setPolyTrashData] = useState([]);
  const [montrealTrashData, setMontrealTrashData] = useState([]);

  useEffect(() => {
    firestore
      .collection('database')
      .doc('app')
      .onSnapshot(doc => {
        const newData = doc.data();
        if (newData) {
          setPolyTrashData(newData.sensor);
        }
      });
  }, []);

  useEffect(() => {
    console.log('mobilierUrbainGP', mobilierUrbainGP);
    const newMontrealTrashData = mobilierUrbainGP.features
      .filter(feature => feature.properties.Element === 'POU')
      .filter(feature => {
        const featureLong = feature.properties.Long;
        const featureLat = feature.properties.Lat;

        return (
          featureLong < POLY_LONG + BOX_SIZE &&
          featureLong > POLY_LONG - BOX_SIZE &&
          featureLat < POLY_LAT + BOX_SIZE &&
          featureLat > POLY_LAT - BOX_SIZE
        );
      })
      .map(feature => ({
        ...feature.properties,
        fullness: Math.floor(Math.random() * 101)
      }));
    console.log('newMontrealTrashData', newMontrealTrashData);

    setMontrealTrashData(newMontrealTrashData);
  }, []);

  // console.log(data);
  return (
    <ReactMapboxGlMap
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={[POLY_LONG, POLY_LAT]}
      zoom={[13]}
    >
      <TrashMarker
        coordinates={[POLY_LONG, POLY_LAT]}
        color={colors[23]}
        text="23%"
      />
      {/* <TrashMarker coordinates={[-73.58781, 45.50884]} color={' #f56565'} />
      <TrashMarker coordinates={[-73.58781, 45.50984]} color={' #ECC94B'} />
      <TrashMarker coordinates={[-73.58731, 45.50894]} color={' #48BB78'} /> */}
      {montrealTrashData.map(trash => (
        <TrashMarker
          key={trash.OBJECTID}
          coordinates={[trash.Long, trash.Lat]}
          color={colors[trash.fullness]}
          text={`${trash.fullness}%`}
        />
      ))}
    </ReactMapboxGlMap>
  );
};

const TrashMarker = props => {
  return (
    <Marker coordinates={props.coordinates} anchor="center">
      <Dot color={props.color}>{props.text || ''}</Dot>
    </Marker>
  );
};

const Dot = styled.div`
  font-family: Inter;

  font-size: 8px;
  line-height: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  border: ${props => `5px solid ${props.color}`};
`;

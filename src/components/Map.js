import React, { Component, useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import styled from 'styled-components';
import firebase from 'firebase';
const ReactMapboxGlMap = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FtdWVsdHNvIiwiYSI6ImNrNWs3Z2s3YjBiN3Mza241MTkweDNsemEifQ.HAKopF1Q8laHm4hK6NR51A'
});

firebase.initializeApp({
  apiKey: "AIzaSyAjyJ-T2RiCOJSFBHEDN3kpBQT3wM39XqY",
  authDomain: "clean-d5b63.firebaseapp.com",
  databaseURL: "https://clean-d5b63.firebaseio.com",
  projectId: "clean-d5b63",
  storageBucket: "clean-d5b63.appspot.com",
  messagingSenderId: "760378273796",
  appId: "1:760378273796:web:25c6a75c3fdafbabf98551"
});
const firestore = firebase.firestore();

export const Map = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    firestore
    .collection('database')
    .doc('app')
    .onSnapshot(doc =>{
      const newData = doc.data();
      if(newData){
        setData(newData.sensor);
      }
    })
  },[])
  console.log(data);
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

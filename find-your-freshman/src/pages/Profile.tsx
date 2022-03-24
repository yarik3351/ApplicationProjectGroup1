import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Button } from 'react-bootstrap';
import { FIREBASE } from '../resources/firebase-constants'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile: React.FC = () => {

    // const [profile, setProfile] = useState({
    //     last_name: 'Last Name',
    //     first_name: 'First Name',
    //     phone: '',
    //     age: 0,
    //     city: '',
    //     country: '',
    //     country_from: ''
    // });

    const [firstName, setFirstName] = useState('First');
    const [lastName, setLastName] = useState('Last');
    const [phone, setPhone] = useState('123');
    const [age, setAge] = useState('5');
    const [city, setCity] = useState('London');
    const [country, setCountry] = useState('Canada');
    const [countryFrom, setCountryFrom] = useState('Israel');

    const handleFirstNameChange = (e: any) => {
        setFirstName(e.target.value);
    }


   

    const buttonTest = (e: any) => {
        e.preventDefault();
        console.log('Clicked')
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;

                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }

    return (
        <div>
            <Form key={uuidv4()}>
                <Form.Group className="mb-3" controlId="formBasicEmail" key={uuidv4()}>
                    <Form.Label key={uuidv4()}>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" key={uuidv4()} defaultValue={firstName}/>
                    <Form.Label key={uuidv4()}>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" key={uuidv4()} defaultValue={lastName}/>
                    <Form.Label key={uuidv4()}>Age</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" key={uuidv4()} defaultValue={age}/>
                    <Form.Label key={uuidv4()}>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" key={uuidv4()} defaultValue={phone}/>
                    <Form.Label key={uuidv4()}>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" key={uuidv4()} defaultValue={city}/>
                    <Form.Label key={uuidv4()}>Country</Form.Label>
                    <Form.Control type="email" placeholder="Enter country" key={uuidv4()} defaultValue={country}/>
                    <Form.Label key={uuidv4()}>Country of Origin</Form.Label>
                    <Form.Control type="email" placeholder="Enter country of Origin" key={uuidv4()} defaultValue={countryFrom}/>
                </Form.Group>
                <Button variant="primary" type="submit" key={uuidv4()} onClick={buttonTest}>
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default Profile;
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Button } from 'react-bootstrap';
import { FIREBASE } from '../resources/firebase-constants'
import { getFirestore, collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createStyles, Avatar, Center } from '@mantine/core'
const Profile: React.FC = () => {

    const useStyles = createStyles(() => ({
        wrapper: {
            marginLeft: '20px'
        },

        button: {
            marginTop: '10px',
            width: '100%'
        },

        main: {
            margin: '10px 20px'
        },

        label: {
            marginTop: '5px'
        }
    }))
    const { classes } = useStyles();

    const [firstName, setFirstName] = useState<any>('');
    const [lastName, setLastName] = useState<any>('');
    const [phone, setPhone] = useState<any>('');
    const [age, setAge] = useState<any>('');
    const [city, setCity] = useState<any>('');
    const [country, setCountry] = useState<any>('');
    const [countryFrom, setCountryFrom] = useState<any>('');
    const [gender, setGender] = useState<any>('');
    const [school, setSchool] = useState<any>('');
    const [avatar, setAvatar] = useState<any>('');

    const handleFirstNameChange = (e: any) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e: any) => {
        setLastName(e.target.value);
    }
    const handlePhoneChange = (e: any) => {
        setPhone(e.target.value);
    }
    const handleAgeChange = (e: any) => {
        setAge(e.target.value);
    }
    const handleCityChange = (e: any) => {
        setCity(e.target.value);
    }
    const handleCountryChange = (e: any) => {
        setCountry(e.target.value);
    }
    const handleCountrFromChange = (e: any) => {
        setCountryFrom(e.target.value);
    }

    const handleGenderChange = (e: any) => {
        setGender(e.target.value);
    }
    const handleSchoolChange = (e: any) => {
        setSchool(e.target.value);
    }
    const auth = getAuth();
    const db = getFirestore();


    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const getData = async () => {

                    const docRef = doc(db, 'profiles', auth!.currentUser!.uid)
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        //console.log(docSnap.data());
                        const data = docSnap.data();
                        setFirstName(data.first_name);
                        setLastName(data.last_name);
                        setPhone(data.phone);
                        setAge(data.age);
                        setCity(data.city);
                        setCountry(data.country);
                        setCountryFrom(data.country_from);
                        setGender(data.gender);
                        setSchool(data.school);
                        setAvatar(user.photoURL);
                    } else {
                        console.log('data for user not found')
                    }
                }
                getData();
                const fName = user.displayName?.split(' ')[0];
                const lName = user.displayName?.split(' ')[1];
                setFirstName(fName);
                setLastName(lName);
            }
        })



    }, [])

    const buttonTest = (e: any) => {
        e.preventDefault();



        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                // Change display name
                updateProfile(user, {
                    displayName: firstName + ' ' + lastName
                }).then(() => { console.log('Updated!') })
                // Update
                await setDoc(doc(db, 'profiles', uid), {
                    first_name: firstName,
                    last_name: lastName,
                    age: age,
                    phone: phone,
                    city: city,
                    country: country,
                    country_from: countryFrom,
                    gender: gender,
                    school: school
                }, { merge: true });
            } else {
                // User is signed out
                // ...
            }
        });
    }

    return (
        <div className={classes.main}>
            <Center key={98} >
            <Avatar key={99} radius="xl" size="xl" src={avatar}></Avatar>
            </Center>
            <Form key={1}>
                <Form.Group className={classes.wrapper} controlId="formBasicEmail" key={2}>
                    <Form.Label  className={classes.label} key={uuidv4()}>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" key={3} value={firstName} onChange={handleFirstNameChange} />
                    <Form.Label  className={classes.label} key={uuidv4()}>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" key={4} defaultValue={lastName} onChange={handleLastNameChange} />
                    <Form.Label  className={classes.label} key={uuidv4()}>Age</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" key={5} defaultValue={age} onChange={handleAgeChange} />
                    <Form.Label  className={classes.label} key={uuidv4()}>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" key={11} defaultValue={gender} onChange={handleGenderChange} />
                    <Form.Label className={classes.label}  key={uuidv4()}>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" key={6} defaultValue={phone} onChange={handlePhoneChange} />
                    <Form.Label  className={classes.label} key={uuidv4()}>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" key={7} defaultValue={city} onChange={handleCityChange} />
                    <Form.Label className={classes.label}  key={uuidv4()}>Country</Form.Label>
                    <Form.Control type="email" placeholder="Enter country" key={8} defaultValue={country} onChange={handleCountryChange} />
                    <Form.Label className={classes.label}  key={uuidv4()}>Country of Origin</Form.Label>
                    <Form.Control type="email" placeholder="Enter country of Origin" key={9} defaultValue={countryFrom} onChange={handleCountrFromChange} />
                    <Form.Label className={classes.label}  key={uuidv4()}>College / University</Form.Label>
                    <Form.Control type="email" placeholder="Enter College / University" key={10} defaultValue={school} onChange={handleSchoolChange} />
                    <Button className={classes.button} variant="primary" type="submit" key={12} onClick={buttonTest}>
                        Update
                    </Button>
                </Form.Group>

            </Form>
        </div>
    );
}

export default Profile;
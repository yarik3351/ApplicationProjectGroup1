import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Button } from 'react-bootstrap'
import { FIREBASE } from '../resources/firebase-constants'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'

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

    const [firstName, setFirstName] = useState<any>('')
    const [lastName, setLastName] = useState<any>('')
    const [phone, setPhone] = useState<any>('')
    const [age, setAge] = useState<any>('')
    const [city, setCity] = useState<any>('')
    const [country, setCountry] = useState<any>('')
    const [countryFrom, setCountryFrom] = useState<any>('')
    const [gender, setGender] = useState<any>('')
    const [school, setSchool] = useState<any>('')
    const [email, setEmail] = useState<any>('')

    const handleFirstNameChange = (e: any) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e: any) => {
        setLastName(e.target.value)
    }
    const handlePhoneChange = (e: any) => {
        setPhone(e.target.value)
    }
    const handleAgeChange = (e: any) => {
        setAge(e.target.value)
    }
    const handleCityChange = (e: any) => {
        setCity(e.target.value)
    }
    const handleCountryChange = (e: any) => {
        setCountry(e.target.value)
    }
    const handleCountrFromChange = (e: any) => {
        setCountryFrom(e.target.value)
    }

    const handleGenderChange = (e: any) => {
        setGender(e.target.value)
    }
    const handleSchoolChange = (e: any) => {
        setSchool(e.target.value)
    }
    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const auth = FIREBASE.AUTH
    const db = getFirestore()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const getData = async () => {
                    const uid = user.uid
                    const docRef = doc(db, 'profiles', uid)
                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        console.log(docSnap.data())
                        const data = docSnap.data()
                        setFirstName(data.first_name)
                        setLastName(data.last_name)
                        setPhone(data.phone)
                        setAge(data.age)
                        setCity(data.city)
                        setCountry(data.country)
                        setCountryFrom(data.country_from)
                        setGender(data.gender)
                        setSchool(data.school)
                    } else {
                        console.log('data for user not found')
                    }
                }
                getData()
                const fName = user.displayName?.split(' ')[0]
                const lName = user.displayName?.split(' ')[1]
                setFirstName(fName)
                setEmail(user.email)
                setLastName(lName)
            }
        })
    })

    const buttonTest = (e: any) => {
        e.preventDefault()

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid
                // ...
                // Change display name
                updateProfile(user, {
                    displayName: firstName + ' ' + lastName
                }).then(() => {
                    console.log('Updated!')
                })
                // Update
                await setDoc(
                    doc(db, 'profiles', uid),
                    {
                        first_name: firstName,
                        last_name: lastName,
                        age: age,
                        phone: phone,
                        city: city,
                        country: country,
                        country_from: countryFrom,
                        gender: gender,
                        school: school
                    },
                    { merge: true }
                )
            } else {
                // User is signed out
                // ...
            }
        })
    }

    return (
        <div>
            <Form key={1}>
                <Form.Group className="mb-3" controlId="formBasicEmail" key={2}>
                    <Form.Label key={uuidv4()}>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" key={3} value={firstName} onChange={handleFirstNameChange} />
                    <Form.Label key={uuidv4()}>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" key={4} defaultValue={lastName} onChange={handleLastNameChange} />
                    <Form.Label key={uuidv4()}>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" key={5} defaultValue={email} onChange={handleEmail} />
                    <Form.Label key={uuidv4()}>Age</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" key={6} defaultValue={age} onChange={handleAgeChange} />
                    <Form.Label key={uuidv4()}>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" key={12} defaultValue={gender} onChange={handleGenderChange} />
                    <Form.Label key={uuidv4()}>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" key={7} defaultValue={phone} onChange={handlePhoneChange} />
                    <Form.Label key={uuidv4()}>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" key={8} defaultValue={city} onChange={handleCityChange} />
                    <Form.Label key={uuidv4()}>Country</Form.Label>
                    <Form.Control type="email" placeholder="Enter country" key={9} defaultValue={country} onChange={handleCountryChange} />
                    <Form.Label key={uuidv4()}>Country of Origin</Form.Label>
                    <Form.Control type="email" placeholder="Enter country of Origin" key={10} defaultValue={countryFrom} onChange={handleCountrFromChange} />
                    <Form.Label key={uuidv4()}>College / University</Form.Label>
                    <Form.Control type="email" placeholder="Enter College / University" key={11} defaultValue={school} onChange={handleSchoolChange} />
                </Form.Group>
                <Button variant="primary" type="submit" key={10} onClick={buttonTest}>
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default Profile

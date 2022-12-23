import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Context } from '../index';

function Conditions() {
    const {conditions} = useContext(Context)
    const {props, selectedProps} = conditions;
    const [state, setState] = useState(selectedProps);

    return (
        <>
                {props.map((property) => {
                    if (property.value instanceof Object)  return(
                            <Form.Group className="mb-2 ms-2" key={property.name}>
                                <Form.Select
                                onChange={(event) => {
                                    conditions.setProperty(property.name, event.target.value)
                                    setState((prev) => ({...prev, [property.name]: event.target.value}))
                                    }}>
                                    <option hidden value>{property.name}</option>
                                    {property.value.map(variant => 
                                        <option key={variant} value={variant}>{variant}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                    )      
                    return (
                        <InputGroup className="mb-2 ms-2" key={property.name}>
                            <InputGroup.Text id={property.name}>{property.name}</InputGroup.Text>
                            <Form.Control id={property.name}  
                            onChange={(event) => {
                                conditions.setProperty(property.name, event.target.value)
                                setState((prev) => ({...prev, [property.name]: event.target.value}))
                                }}
                            />
                            <InputGroup.Text id={property.name} className="me-2">кВт</InputGroup.Text>
                        </InputGroup>
                    )
                    })}   
            <br />
            <div className="d-flex">
            <ul>{Object.keys(state).map(prop => <li key={prop}>{state[prop]}</li>)}</ul>
            <ul>{Object.keys(selectedProps).map(prop => <li key={prop}>{selectedProps[prop]}</li>)}</ul>
            </div>
        </>    
    );
}

export default Conditions;
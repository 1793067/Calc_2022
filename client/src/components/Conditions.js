import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { Context } from '../index';

function Conditions() {
    const { conditions } = useContext(Context)
    const { props } = conditions;

    return (
        <>
                {props.map((property) => {
                    if (property.value instanceof Object)  return(
                            <Form.Group className="mb-2 ms-2" key={property.name}>
                                <Form.Select
                                onChange={(event) => {
                                    conditions.setProperty(property.name, event.target.value)
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
                                }}
                            />
                            <InputGroup.Text id={property.name} className="me-2">кВт</InputGroup.Text>
                        </InputGroup>
                    )
                    })}   
             <div className="d-grid gap-2">
            <Button variant="outline-secondary" className="ms-2">Export to .XLS</Button>
            </div>
            <div className="d-flex">
            </div>
        </>    
    );
}

export default Conditions;
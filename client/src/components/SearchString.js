import { Form, InputGroup } from "react-bootstrap";

function SearchString(props) {
    return (
        <InputGroup className="mb-2 ms-3" style={{width:"97%"}}>
            <InputGroup.Text id="property.name">Поиск по наименованию</InputGroup.Text>
            <Form.Control id="property.name"
            value={props.value}  
            onChange={e => props.onChange(e)}
                />
        </InputGroup>
    )
}


export default SearchString;
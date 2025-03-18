import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "../styles/exportButton.css";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SaveLoad from "./SaveLoad";

const checkboxChecked = (top, left, opacity) => {
  return (
    <Form.Check
      readOnly
      defaultValue="yes"
      style={{ position: "relative", top, left, opacity, height: 0 }}
      type="checkbox"
      checked
    />
  );
};

const Conditions = observer(() => {
  const { tableProps, conditions } = useContext(Context);
  const { props } = conditions;

  const checkBox = (propertyName, top, left, opacity) => {
    return (
      conditions.check(propertyName) && checkboxChecked(top, left, opacity)
    );
  };

  return (
    <div className="conditions-wrapper no-select">
      {props.map((property) => {
        if (property.value instanceof Object)
          return (
            <div className="conditions-select" key={property.name}>
              <Form.Group
                className="mb-2 ms-2 form-floating"
                id={property.name}
              >
                <Form.Select
                  onChange={(event) => {
                    conditions.setProperty(property.name, event.target.value);
                    tableProps.recalculate(conditions);
                  }}
                >
                  <option hidden value>
                    {conditions.selectedProps[property.name] || "-"}
                  </option>
                  {property.value.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </Form.Select>
                <label htmlFor={property.name}>
                  {checkBox(property.name, "-1vw", ".2vw", "1")}
                  {property.name}
                </label>
              </Form.Group>
            </div>
          );
        return (
          <div className="conditions-input" key={property.name}>
            <InputGroup className="mb-2 ms-2">
              <InputGroup.Text id={property.name}>
                {property.name}
              </InputGroup.Text>
              <Form.Control
                id={property.name}
                type="number"
                placeholder={conditions.selectedProps[property.name] || ""}
                onChange={(event) => {
                  conditions.setProperty(property.name, event.target.value);
                  tableProps.recalculate(conditions);
                }}
              />
              <InputGroup.Text id={property.name} className="me-2">
                кВт{checkBox(property.name, "-.6vw", "1.8vw", ".5")}
              </InputGroup.Text>
            </InputGroup>
          </div>
        );
      })}
      <ReactHTMLTableToExcel
        id="headerTable"
        className="conditions-select ms-1 exportButton"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export to .XLS"
      />
      <SaveLoad />
    </div>
  );
});

export default Conditions;

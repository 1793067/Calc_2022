import React from "react";
import { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";

const SaveLoad = observer(() => {
  const { tableProps, conditions } = useContext(Context);
  const [modalActive, setModalActive] = useState(false);
  const [calcTitle, setCalcTitle] = useState(new Date().toLocaleDateString());

  const jsonFileUpload = (event) => {
    let reader = new FileReader();
    reader.onload = (event) => {
      const json_data = JSON.parse(event.target.result);
      const { activities, neighbourTariff, selectedProps, indexes } = json_data;
      const selProps = Object.entries(selectedProps);
      selProps.forEach(([propName, propValue]) =>
        conditions.setProperty(propName, propValue)
      );
      conditions.setIndexes(indexes);
      tableProps.activities = [];
      activities.forEach(({ index, name, value, number, weight }) => {
        tableProps.setPosition(name, value, number);
        tableProps.setWeight(index, weight, conditions);
      });
      tableProps.setNeighbourTariff(neighbourTariff);
    };
    reader.readAsText(event.target.files[0], "UTF-8");
  };

  const jsonFileDownload = (e) => {
    const { activities, neighbourTariff } = tableProps;
    const { selectedProps, indexes } = conditions;
    const json_data = { activities, neighbourTariff, selectedProps, indexes };

    e.stopPropagation();
    setModalActive(false);

    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", calcTitle + ".json");
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ms-2 save-load-container">
      <div className="save-button" onClick={() => setModalActive(true)}>
        Сохранить расчет
      </div>

      <label className="load-button">
        <input
          type="file"
          onChange={jsonFileUpload}
          accept=".json, application/json"
        />
        <span>Открыть расчет</span>
      </label>

      <div
        className={modalActive ? "modal active" : "modal"}
        onClick={() => setModalActive(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            onChange={(e) => setCalcTitle(e.target.value, conditions)}
            value={calcTitle}
          />
          <Button
            variant="outline-secondary"
            onClick={modalActive ? jsonFileDownload : () => {}}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
});

export default SaveLoad;

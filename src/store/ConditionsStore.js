import { makeAutoObservable } from "mobx";

const orgFn = (selectedProps) => {
  let orgTariff = {};

  let provisoC1_2 =
    (selectedProps["заявитель"] === "физическое лицо" &&
      Number(selectedProps["вновь присоединяемая мощность"]) +
        Number(selectedProps["ранее присоединенная мощность"]) <=
        15 &&
      selectedProps["категория надежности"] === "третья" &&
      selectedProps["напряжение"] === "0,4 кВ и менее") ||
    (selectedProps["заявитель"] ===
      "юридическое лицо или индивидуальный предприниматель" &&
      Number(selectedProps["вновь присоединяемая мощность"]) +
        Number(selectedProps["ранее присоединенная мощность"]) <=
        150 &&
      (selectedProps["категория надежности"] === "третья" ||
        selectedProps["категория надежности"] === "вторая") &&
      selectedProps["напряжение"] === "0,4 кВ и менее");

  let provisoMain = [
    "категория надежности",
    "напряжение",
    "заявитель",
    "расстояние до электрических сетей",
    "вновь присоединяемая мощность",
    "ранее присоединенная мощность",
    "срок выполнения мероприятий по ТУ",
  ].every((name) => selectedProps.hasOwnProperty(name));

  //ставки 2025 года
  orgTariff.c1_1 = 15463.93;
  orgTariff.c1_2 = provisoMain
    ? provisoC1_2
      ? {
          name: "Выдача уведомления о возможности присоединения к электрическим сетям",
          value: 7095.65,
          number: "1.2.1.",
        }
      : {
          name: "Проверка выполнения Заявителем технических условий",
          value: 25721.75,
          number: "1.2.2.",
        }
    : 0;

  return orgTariff;
};

const constructionBenefits = (selectedProps) => {
  let individualBenefit =
    selectedProps["заявитель"] === "физическое лицо" &&
    Number(selectedProps["вновь присоединяемая мощность"]) +
      Number(selectedProps["ранее присоединенная мощность"]) <=
      15 &&
    selectedProps["категория надежности"] === "третья" &&
    selectedProps["напряжение"] === "0,4 кВ и менее" &&
    (selectedProps["расстояние до электрических сетей"] ===
      "до 200 метров включительно" ||
      selectedProps["расстояние до электрических сетей"] ===
        "от 200 до 300 метров включительно");

  let entityBenefits =
    selectedProps["заявитель"] ===
      "юридическое лицо или индивидуальный предприниматель" &&
    Number(selectedProps["вновь присоединяемая мощность"]) +
      Number(selectedProps["ранее присоединенная мощность"]) <=
      150 &&
    (selectedProps["категория надежности"] === "третья" ||
      selectedProps["категория надежности"] === "вторая") &&
    selectedProps["расстояние до электрических сетей"] ===
      "до 200 метров включительно" &&
    selectedProps["напряжение"] === "0,4 кВ и менее";

  return individualBenefit
    ? "individual benefit"
    : entityBenefits
    ? "entity benefit"
    : false;
};

export default class ConditionsStore {
  constructor() {
    this.props = [
      { name: "категория надежности", value: ["первая", "вторая", "третья"] },
      {
        name: "напряжение",
        value: ["0,4 кВ и менее", "6-10 кВ", "20 кВ", "более 20 кВ"],
      },
      {
        name: "заявитель",
        value: [
          "юридическое лицо или индивидуальный предприниматель",
          "физическое лицо",
        ],
      },
      {
        name: "расстояние до электрических сетей",
        value: [
          "до 200 метров включительно",
          "от 200 до 300 метров включительно",
          "свыше 300 метров",
        ],
      },
      { name: "вновь присоединяемая мощность", value: 0 },
      { name: "ранее присоединенная мощность", value: 0 },
      {
        name: "срок выполнения мероприятий по ТУ",
        value: ["менее двух лет", "2 года", "3 года", "4 года"],
      },
    ];
    this.paperTariff = {
      //ставки 2025 года
      c1_1: 15463.93,
      c1_2: { name: "", value: 0, number: "" },
    };
    this.selectedProps = {};
    this.indexes = {
      2026: 1.042,
      2027: 1.04,
      2028: 1.0,
      2029: 1.0,
    };
    this.periodI = true;

    this.indexing = () => {
      const two = 0.5 + 0.5 * this.indexes["2026"];
      const three =
        (this.periodI &&
          0.5 * this.indexes["2026"] * this.indexes["2027"] +
            0.5 *
              this.indexes["2026"] *
              this.indexes["2027"] *
              this.indexes["2028"]) ||
        0.5 * this.indexes["2026"] +
          0.5 *
            this.indexes["2026"] *
            this.indexes["2027"] *
            this.indexes["2028"];
      const four =
        0.5 * this.indexes["2026"] * this.indexes["2027"] +
        0.5 * this.indexes["2028"] * this.indexes["2029"];
      const obj = {
        "менее двух лет": 1,
        "2 года": two,
        "3 года": three,
        "4 года": four,
      };
      return (
        obj[this.selectedProps["срок выполнения мероприятий по ТУ"]] || 1
      ); /*undefined в начале*/
    };

    makeAutoObservable(this);
  }

  setProperty(propName, propValue) {
    this.selectedProps[propName] = propValue;
    this.paperTariff = orgFn(this.selectedProps);
    this.constructionBenefits = constructionBenefits(this.selectedProps);
  }

  setIndex(index, value) {
    this.indexes[index] = value;
  }

  changePeriod() {
    this.periodI = !this.periodI;
  }

  check(propName) {
    return this.selectedProps[propName];
  }

  setIndexes(newIndexes) {
    this.indexes = newIndexes;
  }

  get index() {
    return this.indexing();
  }

  get reliability() {
    return this.selectedProps["категория надежности"];
  }

  get voltage() {
    return this.selectedProps["напряжение"];
  }

  get declarant() {
    return this.selectedProps["заявитель"];
  }

  get distance() {
    return this.selectedProps["расстояние до электрических сетей"];
  }

  get connectingCapacity() {
    return Number(this.selectedProps["вновь присоединяемая мощность"]);
  }

  get availableCapacity() {
    return Number(this.selectedProps["ранее присоединенная мощность"]);
  }
}

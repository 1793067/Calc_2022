import { makeAutoObservable } from "mobx";

const obj = [
  {
    check: (activity) =>
      [
        "разъединители",
        "реклоузеры",
        "пункты",
        "средства",
        "комплектные",
        "линии",
      ].some((e) => ~activity.name.indexOf(e)),
    calculateFunc: (activity, conditions) => ({
      res: Number(activity.value) * Number(activity.weight),
      ind: conditions.index,
    }),
  },

  {
    check: (activity) => ~activity.name.indexOf("подстанции"),
    calculateFunc: (activity, conditions, powerStore) => {
      let сoeff = conditions.reliability === "третья" ? 1 : 2;
      //let sumCapacity = Number(conditions.connectingCapacity) + Number(conditions.availableCapacity);
      let sumTransformerPower =
        Object.values(powerStore).reduce((val, cur) => +val + +cur) * 0.93;
      let result = {
        res:
          ((сoeff * Number(conditions.connectingCapacity)) /
            sumTransformerPower) *
          Number(activity.value) *
          (Number(activity.weight) * 0.93),
        ind: conditions.index,
      };
      return result || 0;
    },
  },
];

export default class CalculationStore {
  constructor() {
    this.activities = [];
    this.index = 0;
    this.neighbourTariff = 0;
    this.sumResult = { defSum: 0, indSum: 0 };
    this.sumTransformerPower = {};
    makeAutoObservable(this);
  }

  setPosition(name, value, number) {
    this.activities.push({
      index: this.index,
      name,
      value,
      number,
      result: { res: 0, ind: 0 },
    });
    /**/
    if (~name.indexOf("подстанции")) {
      this.sumTransformerPower[this.index] = 0;
    }
    /**/
    this.index++;
  }

  calculateSum() {
    this.sumResult = this.activities.reduce(
      (sum, activity) => ({
        defSum: sum.defSum + Number(activity.result.res),
        indSum:
          sum.indSum +
          Number(activity.result.res) * Number(activity.result.ind),
      }),
      {
        defSum: Number(this.neighbourTariff),
        indSum: Number(this.neighbourTariff),
      }
    );
  }

  setNeighbourTariff(value) {
    this.neighbourTariff = Number(value);
    this.calculateSum();
  }

  setWeight(index, weight, conditions) {
    let flag = false;
    this.activities = this.activities.map((activity) => {
      if (activity.index === index) {
        activity.weight = weight;
      }
      /**/
      if (~activity.name.indexOf("подстанции")) {
        this.sumTransformerPower[activity.index] = activity.weight;
        flag = true;
      } else {
        activity.result = obj
          .find((item) => item.check(activity))
          .calculateFunc(activity, conditions, this.sumTransformerPower);
      }
      /**/
      return activity;
    });

    if (flag) this.recalculate(conditions);
    else this.calculateSum();
  }

  recalculate(conditions) {
    this.activities = this.activities.map((activity) => ({
      ...activity,
      result: obj
        .find((item) => item.check(activity))
        .calculateFunc(activity, conditions, this.sumTransformerPower),
    }));
    this.calculateSum();
  }

  deleleActivity(index) {
    /**/
    delete this.sumTransformerPower[index];
    /**/
    this.activities = this.activities.filter(
      (activity) => activity.index !== index
    );
  }
}

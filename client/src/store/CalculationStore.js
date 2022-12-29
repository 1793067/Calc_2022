import {makeAutoObservable} from 'mobx';

export default class CalculationStore {
    constructor() {
        this.activities = [];
        makeAutoObservable(this)
    }

    setPosition(tariffName, tariffValue, tariffNumber) {
        this.activities.push({name:tariffName, value:tariffValue, number:tariffNumber})

    }
}
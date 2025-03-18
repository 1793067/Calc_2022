import {makeAutoObservable} from 'mobx';

export default class ConditionsStore {
    constructor() {

        this.props = [
            {name: 'категория надежности', value: ['первая', 'вторая', 'третья']},
            {name: 'напряжение', value: ['0,4 кВ','6-10 кВ','20 кВ','более 20 кВ']},
            {name: 'заявитель', value: ['юридическое лицо или индивидуальный предприниматель','физическое лицо']},
            {name: 'расстояние до электрических сетей', value: ['до 500 метров включительно','свыше 500 метров']},
            {name: 'вновь присоединяемая мощность', value: ''},
            {name: 'ранее присоединенная мощность', value: ''}
    ];

        this.selectedProps = {};
        makeAutoObservable(this)
    }

    setProperty(propName,  propValue) {
        this.selectedProps[propName] = propValue
    }

    get reliability() {
        return this.selectedProps['категория надежности']
    }

    get voltage() {
        return this.selectedProps['напряжение']
    }

    get declarant() {
        return this.selectedProps['заявитель']
    }

    get distance() {
        return this.selectedProps['расстояние до электричесих сетей']
    }

    get connectingCapacity() {
        return this.selectedProps['вновь присоединяемая мощность']
    }

    get availableCapacity() {
        return this.selectedProps['ранее присоединенная мощность']
    }

}
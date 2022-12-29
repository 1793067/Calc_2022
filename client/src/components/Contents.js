import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Menu from "./Menu";

const tabItems = [
    {name:"***", filter:""},
    {name:"ВЛ", filter:"воздушные линии"},
    {name:"КЛ", filter:"кабельные линии"},
    {name:"реклоузеры", filter:"реклоузеры"},
    {name:"ЛР", filter:"линейные разъединители"},
    {name:"РП", filter:"распределительные пункты"},
    {name:"КРУН", filter:"комплектные распределительные устройства"},
    {name:"ТП/РТП", filter:"подстанции"},
    {name:"ПКУ", filter:"средства коммерческого учета"},
];

function Contents(props) {
    return (
       <Tabs
            id="controlled-tab-example"
            fill
        >
            {tabItems.map(tabItem =>
                <Tab eventKey={tabItem.name} title={tabItem.name}>         
                    <Menu content={props.tableContent} tab={tabItem.filter}/>
                </Tab>
            )}
        </Tabs> 
    )
}

export default Contents;

import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import imgPath from "../assets/logo192.png";
import {
  HOME_ROUTE,
  TARIFF_ROUTE,
  LETTERS_ROUTE,
  USER_ROUTE,
} from "../utils/consts";

export default function NaviBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="ps-5 pe-5">
        <Navbar.Brand href="">
          <img
            src={imgPath}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to={HOME_ROUTE}>
            Расчет платы
          </NavLink>
          <NavLink className="nav-link" to={TARIFF_ROUTE}>
            Приказ ДПР-ТР-255_23
          </NavLink>
          <NavLink className="nav-link" to={LETTERS_ROUTE}>
            Разъяснения ФАС
          </NavLink>
          {/*<NavLink className="nav-link" to={USER_ROUTE}>Сохраненные расчеты</NavLink>*/}
        </Nav>
        {/*<Nav>
                    <Button variant="primary" className="me-2">Log in</Button>
                    <Button variant="primary">Sign out</Button>
                </Nav>*/}
      </Navbar>
    </>
  );
}

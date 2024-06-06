import {it, expect, vi} from 'vitest';
import {screen, within} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import axios from 'axios';
import ReactRouter from 'react-router';


import renderWithProviders from '../../__test__/renderWithProviders';
import CityFilter from '../CityFilter';


it('City filter renders a spinner while results are fetch', () =>{
  renderWithProviders(CityFilter.element);
  expect(screen.getByLabelText('loading')).toBeInTheDocument();
});

it("City filter renders a server error if the request fails", async() =>{
  const spyAxios = vi.spyOn(axios, "get").mockImplementation(() =>{
    return Promise.reject({"message": "Internal server error"});
  });
  renderWithProviders(CityFilter.element);
  await new Promise(process.nextTick);
  expect(screen.getByRole('heading', {name: "Something went wrong!"})).toBeInTheDocument();
});

it('CityFilter renders only correct city cards', async() =>{
  const spyAxios = vi.spyOn(axios, "get").mockImplementation(() =>{
    return Promise.resolve({
      data: [
        {
          "estateId":1,
          "url":"/estate/4/TX/Dallas/3843-Bernal-Dr",
          "address1":"3843 Bernal Dr",
          "profilePicture":"/assets/3843-Bernal-Dr-Dallas-TX-75212/3843-Bernal-Dr-Dallas-TX-75212-main-pic.jpg",
          "city":"Dallas",
          "cityId":2,
          "state":"TX",
          "zipCode":"75212",
          "zipCodeId":2,
          "address2":"Dallas TX 75212"
        },
        {
          "estateId":2,
          "url":"/estate/4/TX/Dallas/83-Mc-Kinnie-Dr",
          "address1":"83 Mc Kinnie Dr",
          "profilePicture":"/assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg",
          "city":"Dallas",
          "cityId":2,
          "state":"TX",
          "zipCode":"75212",
          "zipCodeId":2,
          "address2":"Dallas TX 75234"
        },
        {
          "estateId": 3,
          "url":"/estate/4/TX/Dallas/2513-Lemon-rd",
          "address1":"2513 Lemon rd",
          "profilePicture":"/assets/2513-Lemon-rd-Demton-TX-75458/2513-Lemon-rd-Denton-TX-75458-main-pic.jpg",
          "city":"Denton",
          "cityId":4,
          "state":"TX",
          "zipCode":"76458",
          "zipCodeId":6,
          "address2":"Denton TX 75458"
        }
      ]
    });
  });
  const spyCityID = vi.spyOn(ReactRouter, "useParams").mockImplementation(() => {
    return {filterId: "2", city: "Dallas"};
  });
  // const spyCity = vi.spyOn(ReactRouter, "useParams").mockImplementation("Dallas");
  renderWithProviders(CityFilter.element);
  await new Promise(process.nextTick);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
  expect(screen.getByRole('heading', {name: "Dallas"})).toBeInTheDocument();
  expect(links[0]).toHaveProperty('href', 'http://localhost:3000/');
  expect(within(links[0]).getByRole('img')).toHaveProperty('src', 'http://localhost:3000/src/filter/deleteFilter.svg');
  expect(links[1]).toHaveProperty('href', 'http://localhost:3000/estate/4/TX/Dallas/3843-Bernal-Dr');
  expect(within(links[1]).getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/3843-Bernal-Dr-Dallas-TX-75212/3843-Bernal-Dr-Dallas-TX-75212-main-pic.jpg');
  expect(within(links[1]).getByRole('heading', {name: "3843 Bernal Dr"})).toBeInTheDocument();
  expect(within(links[1]).getByRole('heading', {name: "Dallas TX 75212"})).toBeInTheDocument();
  expect(links[2]).toHaveProperty('href', 'http://localhost:3000/estate/4/TX/Dallas/83-Mc-Kinnie-Dr');
  expect(within(links[2]).getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg');
  expect(within(links[2]).getByRole('heading', {name: "83 Mc Kinnie Dr"})).toBeInTheDocument();
  expect(within(links[2]).getByRole('heading', {name: "Dallas TX 75234"})).toBeInTheDocument();
});

import {it, expect, vi} from 'vitest';
import {screen, within} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import axios from 'axios';

import renderWithProviders from '../../__test__/renderWithProviders'
import Home from '../Home';

it('Home renders a spinner while results are fetch', () =>{
  renderWithProviders(Home.element);
  expect(screen.getByLabelText('loading')).toBeInTheDocument();
});

it('Home can render cards', async() =>{
  const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
    return Promise.resolve({
      data: [
        {
          "estateId":4,
          "url":"/estate/4/TX/-Dallas/3843-Bernal-Dr",
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
          "estateId":9,
          "url":"/estate/4/TX/Dallas/83-Mc-Kinnie-Dr",
          "address1":"83 Mc Kinnie Dr",
          "profilePicture":"/assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg",
          "city":"Dallas",
          "cityId":2,
          "state":"TX",
          "zipCode":"75234",
          "zipCodeId":2,
          "address2":"Dallas TX 75234"
        }
      ]
    });
  });
  renderWithProviders(Home.element);
  await new Promise(process.nextTick);
  const link1 = screen.getByLabelText('go to 3843 Bernal Dr Dallas TX 75212');
  expect(link1).toHaveProperty('href', 'http://localhost:3000/estate/4/TX/-Dallas/3843-Bernal-Dr');
  expect(within(link1).getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/3843-Bernal-Dr-Dallas-TX-75212/3843-Bernal-Dr-Dallas-TX-75212-main-pic.jpg');
  expect(within(link1).getByRole('heading', {name: "3843 Bernal Dr"})).toBeInTheDocument();
  expect(within(link1).getByRole('heading', {name: "Dallas TX 75212"})).toBeInTheDocument();
  const link2 = screen.getByLabelText('go to 83 Mc Kinnie Dr Dallas TX 75234');
  expect(link2).toHaveProperty('href', 'http://localhost:3000/estate/4/TX/Dallas/83-Mc-Kinnie-Dr');
  expect(within(link2).getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg');
  expect(within(link2).getByRole('heading', {name: "83 Mc Kinnie Dr"})).toBeInTheDocument();
  expect(within(link2).getByRole('heading', {name: "Dallas TX 75234"})).toBeInTheDocument();
});

it("Home renders a server error if the request fails", async() =>{
  const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
    return Promise.reject({"message": "Internal server error"});
  });
  renderWithProviders(Home.element);
  await new Promise(process.nextTick);
  expect(screen.getByRole('heading', {name: "Something went wrong!"})).toBeInTheDocument();
});
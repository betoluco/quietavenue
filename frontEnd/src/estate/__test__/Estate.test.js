import {it, expect, vi} from 'vitest';
import {screen} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import ReactRouter from 'react-router';

import Estate from '../Estate';
import renderWithProviders from '../../__test__/renderWithProviders'

const state = {
  "estates": {
    "estates": [
      {
        "estateId": 1,
        "url": '/estate/1/CA/-Foster-City/1020-Helm-Ln',
        "address1": '1020 Helm Ln',
        "profilePicture": 'assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg',
        "city": 'Foster City',
        "cityId": 1,
        "state": 'CA',
        "zipCode": '94044',
        "zipCodeId": 1,
        "address2": 'Foster City CA 94044',
        "audioDescription": 'This is a quiet house. You will hear some dogs and many birds due to the closeness with the Foster City lake. There is also, occasionally a light plane passing by due to the small airport close by, and the sound of a few car, leaf blower and garbage trucks',
        "bathroom": 2.5,
        "bedroom": 3,
        "lotArea": 1530,
        "price": 1749012,
        "videoLink": 'https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        "audioData": {}
      }
    ],
    "status": 'succeeded',
    "error": null
  }
};

it ('renders the correct estate passed it the url', () =>{
  const spyEstateId = vi.spyOn(ReactRouter, "useParams").mockImplementation(() => {
    return {estateId: "1"};
  });
  renderWithProviders(Estate.element, {preloadedState: state});
  expect(screen.getByRole('img', {name: "Property"})).toHaveProperty('src', 'http://localhost:3000/assets/83-Mc-Kinnie-Dr-Dallas-TX-75234/83-Mc-Kinnie-Dr-Dallas-TX-75234-main-pic.jpg');
  expect(screen.getByRole('heading', {name: "1020 Helm Ln Foster City CA 94044"})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: "$1,750,000"})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: "Audio recorded in the property Invalid Date - Invalid Date"})).toBeInTheDocument();
});
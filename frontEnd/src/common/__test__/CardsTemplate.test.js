import {it, expect } from 'vitest';
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';

import CardsTemplate from '../CardsTemplate';

const estates = [
    {
        "url":"/estate/1/CA/-Foster-City/1020-Helm-Ln",
        "profilePicture":"/assets/house-svg-icon.svg",
        "address1":"1020 Helm Ln",
        "address2":"Foster City CA 94044"
    },
    {
        "url":"/estate/2/CA/-Foster-City/2141-Mills-Ave",
        "profilePicture":"/assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg",
        "address1":"2141 Mills Ave",
        "address2":"Foster City CA 94044"
    }
];

it('CardsTemplate renders two cards', () =>{
    render(<CardsTemplate estates={estates} />, {wrapper:BrowserRouter});
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0].href).toBe('http://localhost:3000/estate/1/CA/-Foster-City/1020-Helm-Ln');
    expect(links[1].href).toBe('http://localhost:3000/estate/2/CA/-Foster-City/2141-Mills-Ave');
});

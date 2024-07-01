import {it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import  '@testing-library/jest-dom/vitest';

import TrackIndicator from '../TrackIndicator';

const daysList = [
    "2022-03-06T00:00:00",
    "2022-03-07T00:00:00",
    "2022-03-08T00:00:00"
];

it('TrackIndicator does not show previous day', () =>{
    render(<TrackIndicator daysList={daysList} currentTrack={0}/>);
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
});

it('TrackIndicator does not show next day', () =>{
    render(<TrackIndicator daysList={daysList} currentTrack={2}/>);
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
});

it('TrackIndicator renders all days', () =>{
    render(<TrackIndicator daysList={daysList} currentTrack={1}/>);
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
    
});
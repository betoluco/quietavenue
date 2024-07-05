import {it, expect, vi} from 'vitest';
import {screen, render, within} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import React from 'react';

import renderWithProviders from '../../../__test__/renderWithProviders';
import audioData from './audioData.json';
import Graph from "../Graph";

const daysList = Object.keys(audioData);

it('Graph renders correctly', () =>{
    render(<Graph 
        daysList={daysList}
        audioData={audioData} 
        currentTrack={0}
        elapsedTime={0}/>
    );
    expect(screen).toMatchSnapshot();
});

it('Graph corresponding to current track has gray rec background ', () =>{
    
    render(<Graph 
        daysList={daysList}
        audioData={audioData} 
        currentTrack={2}
        elapsedTime={0}/>
    );
    const graph = screen.getByTestId('3/8/2022');
    expect(within(graph).getByTestId('selected-inicator')).toBeInTheDocument();
});
import {it, expect} from 'vitest';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

import ProgressBar from '../ProgressBar';

it('Shows the duration of the track and slider in zero', () =>{
    render(<ProgressBar elapsedTime={0} duration={115}/>);
    expect(screen.getByRole("heading", {name: "0:00 / 1:55"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('min', '0');
    expect(screen.getByRole('slider')).toHaveProperty('max', '115');
    expect(screen.getByRole('slider')).toHaveProperty('value', '0');
});

it('Shows the progress of the track and the slider in the corret position', () =>{
    render(<ProgressBar elapsedTime={65} duration={115}/>);
    expect(screen.getByRole("heading", {name: "1:05 / 1:55"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('min', '0');
    expect(screen.getByRole('slider')).toHaveProperty('max', '115');
    expect(screen.getByRole('slider')).toHaveProperty('value', '65');
});
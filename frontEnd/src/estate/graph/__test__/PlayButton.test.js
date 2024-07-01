import {it, expect} from 'vitest';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

import PlayButton from '../PlayButton';


it('Button displays pause image', async () =>{
    render(<PlayButton isPlaying={true}/>);
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost:3000/src/estate/graph/pauseOp.svg');
});

it('Button displays play image', async () =>{
    render(<PlayButton isPlaying={false}/>);
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost:3000/src/estate/graph/playOp.svg');
});
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

beforeEach(() => {
    // ignore missing license key console message
    jest.spyOn(console, 'error').mockImplementation(() => {
    });
});

test('get top left cell', async () => {
    render(<App/>);
    const topLeftCell = screen.getByText(/Toyota/i);
    expect(topLeftCell).toBeInTheDocument();

    const bottomRightCell = screen.getByText(/72000/i);
    expect(bottomRightCell).toBeInTheDocument();

    // before state tests
    expect(topLeftCell).toHaveClass('ag-cell-value')
    expect(topLeftCell).not.toHaveClass('ag-cell-range-selected')
    expect(topLeftCell).toHaveClass('ag-cell-value')
    expect(topLeftCell).not.toHaveClass('ag-cell-range-selected')

    // click on the top left cell, hold down shift, then click on the bottom right cell
    userEvent.click(topLeftCell)
    userEvent.keyboard('{Shift>}')
    userEvent.click(bottomRightCell)

    // the cells should all have the range selected class applied - here we're just checking the last cell in the selected
    // range - the bottom right cell
    await waitFor(() => expect(screen.getByText(/72000/i)).toHaveClass('ag-cell-range-selected'))

    userEvent.keyboard('{/Shift}')
});

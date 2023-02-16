import React from "react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("test for Button", () => {
  it("render component Button", () => {
    render(<Button>Change name</Button>);
  });

  it("render with snapshot", () => {
    const { asFragment } = render(<Button>Change name</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("render component with text name button", () => {
    render(<Button>Change name</Button>);
    expect(screen.getByText(/Change name/)).toBeInTheDocument();
  });

  it("render multiply component", () => {
    render(
      <>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </>
    );
    expect(screen.queryAllByRole("button").length).toBe(2);
  });

  it('button is disable', () => {
    render(<Button disabled>Delete</Button>)
    expect(screen.getByText(/Delete/)).toBeDisabled()
  })

  it('button have style color black', () => {
    render(<Button>Delete</Button>)
    expect (screen.getByText(/Delete/)).toHaveStyle({color: 'black'})
  })

  it('click with userEvent', async () => {
    const mockHandler = jest.fn()
    render(<Button click={mockHandler}>Delete</Button>)
    await userEvent.click(screen.getByText(/Delete/))
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  it('teachers test for example', async () => {
    const onChange = jest.fn()
    render(<input type='checkbox' onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')
    await userEvent.dblClick(checkbox)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(checkbox).not.toBeChecked()
  })
});

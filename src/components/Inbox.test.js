import { fireEvent, render, screen } from "@testing-library/react";
import Inbox from "./Inbox"
import { BrowserRouter as Router } from "react-router-dom";
const rendering=(components)=>{
    return render(<Router>
        {components}
    </Router>)
}
describe("renders Inbox component",()=>{
    test("renders welcome text in inbox",()=>{
        rendering(<Inbox/>);
        const buttonText=screen.getByText("Welcome to Mail box");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders Compose text in inbox",()=>{
        rendering(<Inbox/>);
        const buttonText=screen.getByText("Compose");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders Inbox text in inbox",()=>{
        rendering(<Inbox/>);
        const buttonText=screen.getByText("Inbox");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders inbox button in inbox",()=>{
        rendering(<Inbox/>);
        const newText=screen.getByRole("button",{name:/Inbox/i});
        expect(newText).toBeInTheDocument();
    })
    test("renders compose button in inbox",()=>{
        rendering(<Inbox/>);
        const newText=screen.getByRole("button",{name:/Compose/i});
        expect(newText).toBeInTheDocument();
    })
})
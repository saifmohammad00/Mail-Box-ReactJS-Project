import { BrowserRouter as Router } from "react-router-dom"
import ComposeMail from "./ComposeMail";
import { render, screen } from "@testing-library/react";

const rendering=(components)=>{
    return render(<Router>
        {components}
    </Router>)
}
describe("renders Compose Mail component",()=>{
    test("renders header text in compose mail",()=>{
        rendering(<ComposeMail/>);
        const headerText=screen.getByText("Welcome to your mail box!!!");
        expect(headerText).toBeInTheDocument();
    })
    test("renders header text in compose mail",()=>{
        rendering(<ComposeMail/>);
        const CardText=screen.getByText("To");
        expect(CardText).toBeInTheDocument();
    })
    test("renders header text in compose mail",()=>{
        rendering(<ComposeMail/>);
        const placeholderText=screen.getByPlaceholderText("Subject");
        expect(placeholderText).toBeInTheDocument();
    })
    test("renders header text in compose mail",()=>{
        rendering(<ComposeMail/>);
        const titleText=screen.getByText("Compose Mail");
        expect(titleText).toBeInTheDocument();
    })
    test("renders header text in compose mail",()=>{
        rendering(<ComposeMail/>);
        const buttonText=screen.getByText("Send");
        expect(buttonText).toBeInTheDocument();
    })
})
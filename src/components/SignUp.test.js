import { render, screen } from "@testing-library/react"
import SignUp from "./SignUp"

describe("renders SignUp component",()=>{
    test('renders signup button text',()=>{
        render(<SignUp/>);
        const LinkText=screen.getByRole("button",{name: /Sign Up/i});
        expect(LinkText).toBeInTheDocument();
    })
    test('renders toggle button text',()=>{
        render(<SignUp/>);
        const LinkText=screen.getByText("Already Have an Account? Login");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders email placeholder',()=>{
        render(<SignUp/>);
        const LinkText=screen.getByPlaceholderText("Enter email");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders password placeholder',()=>{
        render(<SignUp/>);
        const LinkText=screen.getByPlaceholderText("Password");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders confirm password placeholder',()=>{
        render(<SignUp/>);
        const LinkText=screen.getByPlaceholderText("Confirm Password");
        expect(LinkText).toBeInTheDocument();
    })
    
})
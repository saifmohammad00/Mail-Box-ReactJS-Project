import { fireEvent, render, screen } from "@testing-library/react"
import SignUp from "./SignUp"
import { BrowserRouter as Router } from "react-router-dom"

const rendering=(components)=>{
    return render(<Router>
        {components}
    </Router>)
}
describe("renders SignUp component",()=>{
    test('renders signup text in sign up mode',()=>{
        rendering(<SignUp/>);
        const LinkText=screen.getByRole("button",{name: /Sign Up/i});
        expect(LinkText).toBeInTheDocument();
    })
    test('renders "Already Have an account?Login" text in Sign up mode',()=>{
        rendering(<SignUp/>);
        const LinkText=screen.getByText("Already Have an Account? Login");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders email placeholder in Sign Up mode',()=>{
        rendering(<SignUp/>);
        const LinkText=screen.getByPlaceholderText("Enter email");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders password placeholder in Sign Up mode',()=>{
        rendering(<SignUp/>); 
        const LinkText=screen.getByPlaceholderText("Password");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders confirm password placeholder in Sign Up mode',()=>{
        rendering(<SignUp/>);
        const LinkText=screen.getByPlaceholderText("Confirm Password");
        expect(LinkText).toBeInTheDocument();
    })
    test('renders "Dont have an account? Sign Up" text in login mode',()=>{
        rendering(<SignUp/>);
        const toggleButton=screen.getByText("Already Have an Account? Login");
        fireEvent.click(toggleButton);
        const getText=screen.getByText("Don't have an account? Sign Up");
        expect(getText).toBeInTheDocument();
    })
    test('renders "Forget password" text in login mode',()=>{
        rendering(<SignUp/>);
        const toggleButton=screen.getByText("Already Have an Account? Login");
        fireEvent.click(toggleButton);
        const getText=screen.getByText("Forget Password?");
        expect(getText).toBeInTheDocument();
    })
    test('renders "Forget password" in login mode',()=>{
        rendering(<SignUp/>);
        const toggleButton=screen.getByText("Already Have an Account? Login");
        fireEvent.click(toggleButton);
        const getText=screen.getByText("Forget Password?");
        expect(getText).toBeInTheDocument();
    })
    test('renders "confirm password" placeholder be null in login mode',()=>{
        rendering(<SignUp/>);
        const toggleButton=screen.getByText("Already Have an Account? Login");
        fireEvent.click(toggleButton);
        const getText=screen.queryByPlaceholderText("Confirm Password");
        expect(getText).toBeNull();
    })
    test('renders "Sign Up" text be null in login mode',()=>{
        rendering(<SignUp/>);
        const toggleButton=screen.getByText("Already Have an Account? Login");
        fireEvent.click(toggleButton);
        const getText=screen.queryByPlaceholderText("Sign Up");
        expect(getText).toBeNull();
    })
    
})
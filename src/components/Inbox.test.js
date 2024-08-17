import { findByText, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Inbox from "./Inbox"
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import listStore from "./Store/listStore";

const rendering=(initialState)=>{
    const store=configureStore({
        reducer:{
            list:listStore,
        },
        preloadedState:initialState
    })
    return render(<Provider store={store}>
        <Router>
        <Inbox/>
    </Router>
    </Provider>)
}
describe("renders Inbox component",()=>{
    test("renders welcome text in inbox",()=>{
        rendering({});
        const buttonText=screen.getByText("Welcome to Mail box");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders Compose text in inbox",()=>{
        rendering({});
        const buttonText=screen.getByText("Compose");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders Inbox text in inbox",()=>{
        rendering({});
        const buttonText=screen.getByText("Inbox");
        expect(buttonText).toBeInTheDocument();
    })
    test("renders inbox button in inbox",()=>{
        rendering({});
        const newText=screen.getByRole("button",{name:/Inbox/i});
        expect(newText).toBeInTheDocument();
    })
    test("renders compose button in inbox",()=>{
        rendering({});
        const newText=screen.getByRole("button",{name:/Compose/i});
        expect(newText).toBeInTheDocument();
    })
    test("renders unread text in inbox",()=>{
        rendering({
            list:{isRead:1}
        });
        const Text=screen.getByText("Inbox unread (1)");
        expect(Text).toBeInTheDocument();
    })
    test("renders unread text in inbox",()=>{
        rendering({
            list:{isRead:2}
        });
        const Text=screen.getByText("Inbox unread (2)");
        expect(Text).toBeInTheDocument();
    })
    test("renders unread text in inbox",()=>{
        rendering({
            list:{isRead:0}
        });
        const Text=screen.getByText("Inbox");
        expect(Text).toBeInTheDocument();
    })
    test("renders delete button in inbox",async()=>{
        rendering({});
        fireEvent.click(screen.getByText("Inbox"));
        expect((await screen.findAllByText("Delete")).length).toBeGreaterThan(0);
    })
    test("renders  mails text in inbox",async()=>{
        rendering({});
        fireEvent.click(screen.getByText("Inbox"));
        expect((await screen.findByText("Mails"))).toBeInTheDocument();
    })
})
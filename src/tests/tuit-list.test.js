import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    { username: "alice", password: "alice123", email: "alice@wonderland.com", _id: "123"},
    { username: "bob", password: "bob123", email: "bob@hope.com", _id: "234"},
    { username: "charlie", password: "charlie321", email: "charlie@peanuts.com", _id: "345"}];

const MOCKED_TUITS = [
    { tuit: "alice's tuit", postedBy: MOCKED_USERS[0] },
    { tuit: "bob's tuit", postedBy: MOCKED_USERS[1] },
    { tuit: "charlie's tuit", postedBy: MOCKED_USERS[2]}] ;

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
    const tuitLinkElement = screen.getByText(/alice's tuit/i);
    expect(tuitLinkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
    const tuitTextElement = screen.getByText(/bob's tuit/i);
    expect(tuitTextElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, "get");
  mock.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

    const tuitLinkElement = screen.getByText(/charlie's tuit/i);
    expect(tuitLinkElement).toBeInTheDocument();
  mock.mockRestore();
});

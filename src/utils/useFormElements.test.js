import { renderHook } from "@testing-library/react-hooks";
import useFormElements from "./useFormElements";

let customHookObj;
const handleSubmit = () => {
  const userObj = [
    {
      username: "john@doe.com",
      password: "doeJohn",
    },
    {
      username: "anna@smith.com",
      password: "smithAnna",
    },
  ].find((ele) => {
    return ele.userName === customHookObj.inputs.userName;
  });
  return userObj;
};
describe("Custom hook Testing", () => {
  beforeEach(() => {
    customHookObj = renderHook(() =>
      useFormElements({ username: "", password: "" }, handleSubmit)
    );
  });
  test("is custom hook created with correct details", () => {
    expect(Object.keys(customHookObj.result.current.inputs).length).toBe(2);
  });
  //   test("is custom hook handleSubmitfunctionality working", ()=> {
  //     let
  //     customHookObj.result.
  //   });
});

import { styled } from "styled-components";

export const PhoneContext = (Story: any) => (
  <MyPhoneContext>
    <Story />
  </MyPhoneContext>
);

const MyPhoneContext = styled.div`
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    height: 884px;
`;

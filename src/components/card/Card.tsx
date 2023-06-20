import { styled } from "styled-components";

export type CardProps = {
    title: string;
    subTitle: string;
};

export const Card = ({
    title,
    subTitle
} : CardProps): JSX.Element => {
    return <MyCard>
        { title && <MyTitle>{title}</MyTitle>} 
        { subTitle && <MySubTitle>{subTitle}</MySubTitle>}
    </MyCard>
};


const MyCard = styled.div`
    background-color: #D9D9D9;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    text-align: center;
    width: auto;
    height: auto;
`;
const MyTitle = styled.span`
    font-size: 24px;
    margin: 5px;
`;
const MySubTitle = styled.span`
    font-size: 16px;
    margin: 5px;
`;
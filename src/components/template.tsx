// components/template.tsx
'use client';

import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    padding: 28px 60px;
    border-bottom: solid 1px #ECEEEB;
`;
interface SubTitleProps {
  $type?: string;
}
const SubTitle = styled.span<SubTitleProps>`
  width: 75;
  height: 18;
  border-radius: 3px;
  padding-top: 1px;
  padding-right: 6px;
  padding-bottom: 1px;
  padding-left: 5px;
  
  ${(props) =>
    props.$type === 'success'
      ?
      `
      color: #008000;
      background-color: #00800014;
  `
      : `
      color: #FFA500;
      background-color: #80808014;
      `}
`;

const Body = styled.div`
    display: flex;
    padding: 38px 60px;
`;

const Template = styled.div`
`;

interface TemplateProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
  subTitleType: string
}

export default function TemplateComponent(props: TemplateProps) {
  return (
    <Template>
      <Header>
        {props.title} <SubTitle $type={props.subTitleType}>{props.subTitle}</SubTitle>
      </Header>
      <Body>
        {props.children}
      </Body>
    </Template>
  );
}

import styled from "styled-components";
import { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Mali", cursive;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: rgba(13, 110, 253, 0.1);
      color: #0d6efd;
      border: 1px solid #0d6efd;
    `}
    ${(props) =>
    props.payment &&
    !props.outline &&
    css`
    margin-top: 15px;
    height: 2.5rem;
      background-color: darkgreen;
      color: #fff;
    `}
    ${(props) =>
    props.payment &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
    ${(props) =>
    props.red &&
    !props.outline &&
    css`
    margin-top: 15px;
    height: 2.5rem;
      background-color: #AF7C7B;
      color: #fff;
    `}
    ${(props) =>
    props.red &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
    `}

    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `}
${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

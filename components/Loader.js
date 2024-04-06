import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex; /* Ustawienie kontenera na flexbox */
  justify-content: center; /* Wycentrowanie w poziomie */
  align-items: center; /* Wycentrowanie w pionie */
  height: 100%; /* Ustawienie wysokości kontenera na 100% */
  margin-top: 2rem;
  margin-bottom: .5rem;
  
  .lds-ring {
    display: inline-block;
    position: relative;
    width: ${({ width }) => width}px; /* Ustawienie szerokości Loadera na podstawie przekazanej wartości props width */
    height: ${({ height }) => height}px; /* Ustawienie wysokości Loadera na podstawie przekazanej wartości props height */
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 768px) {
    /* Warunkowe stylowanie dla mniejszych ekranów */
    .lds-ring {
      width: 64px; /* Domyślna szerokość dla mniejszych ekranów */
      height: 64px; /* Domyślna wysokość dla mniejszych ekranów */
    }
  }
`;

const Loader = ({ width, height }) => {
  return (
    <LoaderContainer width={width} height={height}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderContainer>
  );
};

export default Loader;

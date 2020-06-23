import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #ff9000;
    border-radius: 4px;
    bottom: calc(100% + 12px);
    color: #312e38;
    font-size: 14px;
    font-weight: 500;
    left: 50%;
    opacity: 0;
    padding: 8px;
    position: absolute;
    transform: translateX(-50%);
    visibility: hidden;
    transition: visibility 0s 0.4s, opacity 0.4s linear;
    width: 160px;

    &::before {
      border-color: #ff9000 transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: '';
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    transition: opacity 0.4s linear;
    visibility: visible;
  }
`;

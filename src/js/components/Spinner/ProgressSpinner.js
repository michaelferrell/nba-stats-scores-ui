import React from "react"
import styled from "styled-components"

const RectWidth = 10
const RectCount = 5
const ProgressSpinner = styled.div`
  position: absolute;
  left: 1em;
  top: 0;
  .spinner {
    width: ${RectWidth * RectCount}px;
    height: 2px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #21ba45;
    height: 100%;
    width: ${RectWidth}px;
    display: inline-block;

    -webkit-animation: sk-stretchdelay 4s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.1);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`

export default () => (
  <ProgressSpinner>
    <div class="spinner">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
  </ProgressSpinner>
)

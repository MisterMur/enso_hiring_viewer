import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const StyledEvent = styled.div`
  background: ${(props) => (props.isMouseDown ? "blue" : "green")};
  opacity: 0.5;
  width: ${(props) => (props.width ? props.width : 0)}px;
  height: 110px;
  position: absolute;
  border-radius: 10%;
  top: 10px;
  left: ${(props) => (props.offsetLeft ? props.offsetLeft : 0)}px;
  ref: ${(props) => props.eventRef};
`;
const LeftBorder = styled.div`
  background: purple;
  opacity: 0.5;
  width: 10px;
  position: relative;
  height: 110px;
  top: 10px;
  left: ${(props) => (props.offsetLeft ? props.offsetLeft : 0)}px;
`;
//   ref: ${(props) => props.eventRef};
const RightBorder = styled.div`
  background: purple;
  opacity: 0.5;
  position: relative;
  width: 10px;
  height: 110px;
  top: 10px;
  left: ${(props) => (props.offsetLeft ? props.offsetLeft : 0)}px;
`;

const Event = (props) => {
  const { startPos, endPos, isMouseDown } = props;
  const [mouseDown, setMouseDown] = useState(isMouseDown);
  const [startResized, setStartResized] = useState(false);
  const [endResized, setEndResized] = useState(false);

  const [start, setStart] = useState(startPos);
  const [end, setEnd] = useState(endPos);
  console.log("mousedown ", mouseDown);

  /**************  Start Resize *****************/
  const handleEventStartMouseDown = (e) => {
    setMouseDown(true);
    setStartResized(true);
    setStart(e.clientX);
  };
  const handleEventStartMouseUp = (e) => {
    if (!mouseDown) return;
    setMouseDown(false);

    setStart(e.clientX);
  };
  const handleEventStartMouseMove = (e) => {
    if (!mouseDown) return;
    setStart(e.clientX);
  };
  const handleEventStartMouseLeave = (e) => {
    setMouseDown(false);
    handleEventStartMouseUp(e);
  };

  /**************  End Resize *****************/
  const handleRightClick = (e) => {};
  const handleEventEndMouseDown = (e) => {
    console.log("in handle end mouse down");
    setMouseDown(true);
    setEndResized(true);
    setEnd(e.clientX);
  };
  const handleEventEndMouseUp = (e) => {
    if (!mouseDown) return;
    setMouseDown(false);

    setEnd(e.clientX);
  };
  const handleEventEndMouseMove = (e) => {
    if (!mouseDown) return;
    setEnd(e.clientX);
  };
  const handleEventEndMouseLeave = (e) => {
    setMouseDown(false);
    handleEventEndMouseUp(e);
  };
  const renderEvent = () => {
    if (startResized) {
      return (
        <StyledEvent
          height={props.height}
          isMouseDown={mouseDown}
          width={endPos - start}
          offsetLeft={start}
        />
      );
    } else if (endResized) {
      return (
        <StyledEvent
          height={props.height}
          isMouseDown={mouseDown}
          width={end - startPos}
          offsetLeft={startPos}
        />
      );
    } else {
      return (
        <StyledEvent
          height={props.height}
          isMouseDown={props.isMouseDown || mouseDown}
          width={endPos - startPos}
          offsetLeft={startPos}
        />
      );
    }
  };

  return (
    <div style={{ display: "flex", height: "110px", position: "absolute" }}>
      <LeftBorder
        offsetLeft={startPos}
        onMouseUp={handleEventStartMouseUp}
        onMouseMove={handleEventStartMouseMove}
        onMouseLeave={handleEventStartMouseLeave}
        onMouseDown={handleEventStartMouseDown}
      />
      {renderEvent()}
      <RightBorder
        offsetLeft={endPos}
        onClick={handleRightClick}
        onMouseUp={handleEventEndMouseUp}
        onMouseMove={handleEventEndMouseMove}
        onMouseLeave={handleEventEndMouseLeave}
        onMouseDown={handleEventEndMouseDown}
      />
    </div>
  );
};

export default Event;

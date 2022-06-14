import React, { useState, useRef } from "react";
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
`;
//   ref: ${(props) => props.ref};
const LeftBorder = styled.div`
  display: ${(props) => props.display};

  background: purple;
  opacity: 0.5;
  width: 10px;
  position: relative;
  height: 110px;
  top: 10px;
  left: ${(props) => (props.offsetLeft ? props.offsetLeft : 0)}px;
`;
const RightBorder = styled.div`
  display: ${(props) => props.display};
  background: purple;
  opacity: 0.5;
  position: relative;
  width: 10px;
  height: 110px;
  top: 10px;
  left: ${(props) => (props.offsetLeft ? props.offsetLeft : 0)}px;
`;

const Event = (props) => {
  const eventRef = useRef();
  const { startPos, endPos, isMouseDown } = props;
  const [mouseDown, setMouseDown] = useState(isMouseDown);
  const [startResized, setStartResized] = useState(false);
  const [endResized, setEndResized] = useState(false);

  const [start, setStart] = useState(startPos);
  const [end, setEnd] = useState(endPos);

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
    console.log(eventRef.current.width);

    setStart(e.clientX);
  };
  const handleEventStartMouseLeave = (e) => {
    setMouseDown(false);
    handleEventStartMouseUp(e);
  };
  /**************  End Resize *****************/
  const handleEventEndMouseDown = (e) => {
    // debugger;
    // console.log(eventRef.current.offsetWidth);
    setEndResized(true);
    setMouseDown(true);
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
          ref={eventRef}
        />
      );
    } else if (endResized) {
      return (
        <StyledEvent
          height={props.height}
          isMouseDown={mouseDown}
          width={end - startPos}
          offsetLeft={startPos}
          ref={eventRef}
        />
      );
    } else {
      return (
        <StyledEvent
          height={props.height}
          isMouseDown={props.isMouseDown || mouseDown}
          width={endPos - startPos}
          offsetLeft={startPos}
          ref={eventRef}
        />
      );
    }
  };

  return (
    <div style={{ display: "flex", height: "110px", position: "absolute" }}>
      <LeftBorder
        display={startPos ? "inline-block" : "none"}
        offsetLeft={startPos}
        onMouseUp={handleEventStartMouseUp}
        onMouseMove={handleEventStartMouseMove}
        onMouseLeave={handleEventStartMouseLeave}
        onMouseDown={handleEventStartMouseDown}
      />
      {renderEvent()}
      <RightBorder
        display={startPos ? "inline-block" : "none"}
        offsetLeft={endPos}
        onMouseUp={handleEventEndMouseUp}
        onMouseMove={handleEventEndMouseMove}
        onMouseLeave={handleEventEndMouseLeave}
        onMouseDown={handleEventEndMouseDown}
      />
    </div>
  );
};

export default Event;

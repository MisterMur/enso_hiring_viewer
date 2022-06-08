import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { SineWave } from "components";
import Event from "./Event";
const Container = styled.div`
  position: relative;
`;

// The Overlay is a div that lies on top of the chart to capture mouse events
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

// The chart canvas will be the same height/width as the ChartWrapper
// https://www.chartjs.org/docs/3.2.1/configuration/responsive.html#important-note
const ChartWrapper = styled.div``;

const SignalView = () => {
  // Access the height of the chart as chartWrapperRef.current?.clientHeight to determine the height to set on events
  const chartWrapperRef = useRef();
  //   const eventRef = useRef();

  const [mouseDown, setMouseDown] = useState(false);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [events, setEvents] = useState([]);

  const handleOverlayClick = (event) => {
    // Prevent the event from bubbling up to the chart
    event.stopPropagation();
    event.preventDefault();
  };
  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStart(e.clientX);
  };
  const handleMouseUp = (e) => {
    if (!mouseDown) return;
    setMouseDown(false);

    setEnd(e.clientX);
    // setEvents([...events]);
    setEvents([...events, { start, end }]);
  };
  const handleMouseMove = (e) => {
    if (!mouseDown) return;
    setEnd(e.clientX);
  };
  const handleMouseLeave = (e) => {
    setMouseDown(false);
    handleMouseUp(e);
  };
  console.log("in overlay mousdown", mouseDown);

  return (
    <Container>
      <ChartWrapper ref={chartWrapperRef}>
        <SineWave samplingRate={50} lowerBound={0} upperBound={10} />
      </ChartWrapper>
      {/* The overlay covers the same exact area the sine wave chart does */}
      <Overlay
        onClick={handleOverlayClick}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        ref={chartWrapperRef}
      >
        {events.map((e, idx) => {
          return (
            <Event
              key={idx}
              isMouseDown={false}
              startPos={e.start}
              endPos={e.end}
              height={chartWrapperRef.current?.clientHeight}
              width={e.end - e.start}
              offsetLeft={e.start}
              //   ref={eventRef}
            />
          );
        })}

        <Event
          height={chartWrapperRef.current?.clientHeight}
          isMouseDown={mouseDown}
          startPos={start}
          endPos={end}
          width={end - start}
          offsetLeft={start}
          //   ref={eventRef}
        />
        {/* You can place events in here as children if you so choose */}
      </Overlay>
    </Container>
  );
};

export default SignalView;

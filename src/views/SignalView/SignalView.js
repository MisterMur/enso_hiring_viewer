import React, { useRef, useState } from "react";
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
  const eventRef = useRef();

  const [mouseDown, setMouseDown] = useState(false);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [events, setEvents] = useState([]);
  const [numEvents, setNumEvents] = useState(1);

  const handleOverlayClick = (event) => {
    // Prevent the event from bubbling up to the chart
    event.stopPropagation();
    event.preventDefault();
  };
  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStart(e.clientX);
    // console.log(chartWrapperRef.current);
  };
  const handleMouseUp = (e) => {
    if (!mouseDown) return;
    setMouseDown(false);

    setEnd(e.clientX);

    setEvents([
      ...events,
      {
        src: <Event />,
        start,
        end,
        id: numEvents,
      },
    ]);

    setEvents([...events, { src: <Event />, start, end, id: numEvents }]);
    setNumEvents(numEvents + 1);

    // setEvents([...events, { start, end }]);
  };
  const handleMouseMove = (e) => {
    if (!mouseDown) return;

    setEnd(e.clientX);
  };
  const handleMouseLeave = (e) => {
    setMouseDown(false);
    handleMouseUp(e);
  };
  const handleResize = (eventId, start) => {
    console.log(events, start);
    let resizedEvents = events.map((evnt) => {
      console.log("evnt", evnt);
      console.log("eventid", eventId);
      if (evnt.id === eventId) {
        evnt.start = start;
        return evnt;
      } else return evnt;
    });
    setEvents(resizedEvents);
    console.log(events);
    // debugger;
    // resizedEvent = chartWrapperRef.current.children;
  };

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
          console.log(idx);
          return (
            <Event
              key={idx}
              id={idx}
              isMouseDown={false}
              startPos={e.start}
              endPos={e.end}
              handleResize={handleResize}
              height={chartWrapperRef.current?.clientHeight}
              width={e.end - e.start}
              offsetLeft={e.start}
              ref={e.eventRef}
            />
          );
        })}

        <Event
          id={"new"}
          height={chartWrapperRef.current?.clientHeight}
          handleResize={handleResize}
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

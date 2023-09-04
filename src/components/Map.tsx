// components/CoordinatePlane.tsx
import React, { useEffect, useState } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";

interface Point {
  name: number;
  type: number;
  pos: number[];
  edge: number[];
}

interface ObjectProps {
  [key: string]: any;
}
interface CoordinatePlaneProps {
  data: Point[];
  obj: ObjectProps;
}

const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({ data, obj }) => {
  const maxCoordinate = 70; // Maximum x and y coordinate values
  const dotRadius = 8;
  console.log(obj["147"]);

  const [newDotPosition1, setNewDotPosition1] = useState({
    x: (obj["147"][0] / maxCoordinate) * 2450,
    y: 1000 - (obj["147"][1] / maxCoordinate) * 3800 - 170,
  });

  // useEffect(() => {

  //   const timer = setInterval(() => {
  //     setNewDotPosition1((prev) => {
  //       return {x: prev.x++, y: prev.y++}
  //     })
  //   }, 1000)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "coordinate-plane-container",
      width: window.innerWidth - 30,
      height: 1000,
    });

    const layer = new Konva.Layer();

    // 우측 1번째
    {
      const xAxis1 = new Konva.Line({
        // x1, y1, x2, y2, x3, y3
        points: [650, 50, stage.width() - 385, 50],
        stroke: "red",
      });

      const xAxis2 = new Konva.Line({
        points: [650, 160, stage.width() - 385, 160],
        stroke: "orange",
      });

      const xAxis3 = new Konva.Line({
        points: [650, 95, stage.width() - 385, 95],
        stroke: "red",
      });

      const xAxis4 = new Konva.Line({
        points: [650, 115, stage.width() - 385, 115],
        stroke: "red",
      });

      const yAxis1 = new Konva.Line({
        points: [650, 50, 650, 160],
        stroke: "blue",
      });

      const yAxis2 = new Konva.Line({
        points: [stage.width() - 385, 50, stage.width() - 385, 160],
        stroke: "blue",
      });

      layer.add(xAxis1);
      layer.add(xAxis2);
      layer.add(xAxis3);
      layer.add(xAxis4);
      layer.add(yAxis1);
      layer.add(yAxis2);
      for (let i = 0; i < 8; i++) {
        layer.add(
          new Konva.Line({
            points: [705 + 100 * i, 50, 705 + 100 * i, 160],
            stroke: "blue",
          })
        );
      }
    }

    // 우측 2번째
    {
      const xAxis1 = new Konva.Line({
        // x1, y1, x2, y2, x3, y3
        points: [650, 365, stage.width() - 385, 365],
        stroke: "orange",
      });

      const xAxis2 = new Konva.Line({
        points: [650, 410, stage.width() - 385, 410],
        stroke: "orange",
      });

      const xAxis3 = new Konva.Line({
        points: [650, 430, stage.width() - 385, 430],
        stroke: "orange",
      });

      const xAxis4 = new Konva.Line({
        points: [650, 480, stage.width() - 385, 480],
        stroke: "red",
      });

      const yAxis1 = new Konva.Line({
        points: [650, 365, 650, 480],
        stroke: "blue",
      });

      const yAxis2 = new Konva.Line({
        points: [stage.width() - 385, 365, stage.width() - 385, 480],
        stroke: "blue",
      });

      layer.add(xAxis1);
      layer.add(xAxis2);
      layer.add(xAxis3);
      layer.add(xAxis4);
      layer.add(yAxis1);
      layer.add(yAxis2);
      for (let i = 0; i < 8; i++) {
        layer.add(
          new Konva.Line({
            points: [700 + 100 * i, 365, 700 + 100 * i, 480],
            stroke: "blue",
          })
        );
      }
    }

    // 우측 3번째

    {
      const xAxis1 = new Konva.Line({
        // x1, y1, x2, y2, x3, y3
        points: [650, 680, stage.width() - 385, 680],
        stroke: "orange",
      });

      const xAxis2 = new Konva.Line({
        points: [650, 720, stage.width() - 385, 720],
        stroke: "red",
      });

      const yAxis1 = new Konva.Line({
        points: [650, 680, 650, 720],
        stroke: "blue",
      });

      const yAxis2 = new Konva.Line({
        points: [stage.width() - 385, 680, stage.width() - 385, 720],
        stroke: "blue",
      });

      layer.add(xAxis1);
      layer.add(xAxis2);
      layer.add(yAxis1);
      layer.add(yAxis2);
      for (let i = 0; i < 8; i++) {
        layer.add(
          new Konva.Line({
            points: [700 + 100 * i, 680, 700 + 100 * i, 720],
            stroke: "blue",
          })
        );
      }
    }

    // 좌측 1번째
    {
      const xAxis1 = new Konva.Line({
        // x1, y1, x2, y2, x3, y3
        points: [220, 170, 320, 170],
        stroke: "orange",
      });

      const xAxis2 = new Konva.Line({
        points: [220, 410, 320, 410],
        stroke: "orange",
      });

      const yAxis1 = new Konva.Line({
        points: [220, 170, 220, 410],
        stroke: "orange",
      });

      const yAxis2 = new Konva.Line({
        points: [320, 170, 320, 410],
        stroke: "orange",
      });

      layer.add(xAxis1);
      layer.add(xAxis2);
      layer.add(yAxis1);
      layer.add(yAxis2);
    }

    // 좌측 2번째
    {
      const xAxis1 = new Konva.Line({
        // x1, y1, x2, y2, x3, y3
        points: [210, 535, 350, 535],
        stroke: "orange",
      });

      const xAxis2 = new Konva.Line({
        points: [210, 690, 350, 690],
        stroke: "orange",
      });

      const yAxis1 = new Konva.Line({
        points: [210, 535, 210, 690],
        stroke: "orange",
      });

      const yAxis2 = new Konva.Line({
        points: [350, 535, 350, 690],
        stroke: "orange",
      });

      layer.add(xAxis1);
      layer.add(xAxis2);
      layer.add(yAxis1);
      layer.add(yAxis2);
    }
    // // Draw y-axis
    // const yAxis = new Konva.Line({
    //   points: [30, 0, stage.height() - 800, stage.height() - 13],
    //   stroke: "black",
    // });

    // for(let i = 0; i <= 6; i += 1) {
    //   const label = new Konva.Label({
    //     x: 5,
    //     y: (i * 2) + (i * 132),
    //     draggable: true,
    //   });

    //   label.add(
    //     new Konva.Text({
    //       text: (12-(i*2)).toString(),
    //       fontSize: 15,
    //       lineHeight: 1.2,
    //       fill: "black",
    //     })
    //   );
    //   layer.add(label);
    // }

    // for(let i = 0; i <= 10; i += 1) {
    //   const label = new Konva.Label({
    //     x: 30+  (i * 170),
    //     y: 817,
    //     draggable: true,
    //   });

    //   label.add(
    //     new Konva.Text({
    //       text: ((i*5)).toString(),
    //       fontSize: 15,
    //       lineHeight: 1.2,
    //       fill: "black",
    //     })
    //   );
    //   layer.add(label);
    // }
    // Add x-axis and y-axis to the layer
    // layer.add(yAxis);

    // Draw points and edges
    data.forEach((point) => {
      const [x, y] = point.pos;

      // Scale the coordinates to fit within the screen
      // const scaledX = (x / maxCoordinate) * stage.width();
      const scaledX = (x / maxCoordinate) * 2450;
      // const scaledY = (y / maxCoordinate) * stage.height();
      const scaledY = (y / maxCoordinate) * 3800 + 170;

      // Draw a circle for the point
      const circle = new Konva.Circle({
        x: scaledX,
        y: stage.height() - scaledY,
        radius: dotRadius,
        fill: point.name === 500 || point.name === 501 ? "purple" : (point.name >= 1 && point.name <= 58 ? "orange" : "greenyellow")
      });

      const label = new Konva.Label({
        x: scaledX - 10,
        y: stage.height() - scaledY - 30,
        draggable: true,
      });

      // add text to the label
      label.add(
        new Konva.Text({
          text: point.name.toString(),
          fontSize: 15,
          lineHeight: 1.2,
          fill: "black",
        })
      );
      // Add the circle to the layer
      layer.add(circle);
      layer.add(label);

      // Draw edges
      point.edge.forEach((edgeIndex) => {
        const edgeEnd = data.find((p) => p.name === edgeIndex);
        if (edgeEnd) {
          const [edgeX, edgeY] = edgeEnd.pos;
          // const scaledEdgeX = (edgeX / maxCoordinate) * stage.width();
          const scaledEdgeX = (edgeX / maxCoordinate) * 2450;
          // const scaledEdgeY = (edgeY / maxCoordinate) * stage.height();
          const scaledEdgeY = (edgeY / maxCoordinate) * 3800 + 170;

          const line = new Konva.Line({
            points: [
              scaledX,
              stage.height() - scaledY,
              scaledEdgeX,
              stage.height() - scaledEdgeY,
            ],
            stroke: "blue",
          });

          // Add the edge line to the layer
          layer.add(line);
        }
      });
    });

    // Draw grid lines along the x-axis
    // for (let i = 1; i <= maxCoordinate; i+=5.3) {
    //   const scaledX = (i / maxCoordinate) * 2260; // Adjust the scaling factor as needed

    //   const verticalLine = new Konva.Line({
    //     points: [scaledX, 10, scaledX, stage.height()],
    //     stroke: "lightgray",
    //     dash: [10, 10], // Dashed pattern for grid lines
    //   });

    //   layer.add(verticalLine);
    // }

    // // Draw grid lines along the y-axis
    // for (let i = -1.7; i <= maxCoordinate; i+=4.3) {
    //   const scaledY = (i / maxCoordinate) * 2200; // Adjust the scaling factor as needed

    //   const horizontalLine = new Konva.Line({
    //     points: [
    //       50,
    //       stage.height() - scaledY - 70,
    //       stage.width() - 150,
    //       stage.height() - scaledY - 70,
    //     ],
    //     stroke: "lightgray",
    //     dash: [10, 10], // Dashed pattern for grid lines
    //   });

    //   layer.add(horizontalLine);
    // }

    const newDot = new Konva.Circle({
      x: newDotPosition1.x,
      y: newDotPosition1.y,
      radius: dotRadius,
      fill: "green", // Choose a color for the new dot
      draggable: true,
      onDragEnd: (event: { target: any }) => {
        const dot = event.target;
        const dotX = dot.x();
        const dotY = dot.y();
        setNewDotPosition1({ x: dotX, y: dotY });
      },
    });

    layer.add(newDot);
    // Add the layer to the stage
    stage.add(layer);
  }, [data, newDotPosition1]);

  return (
    <div id="coordinate-plane-container">
      <Stage height={400} width={500}>
        <Layer></Layer>
      </Stage>
    </div>
  );
};

export default CoordinatePlane;

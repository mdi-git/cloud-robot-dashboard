import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Line } from "react-konva";
import { IFrame } from "konva/lib/types";


const DOT_RADIUS = 8;


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
  // robot1: string; // robot1의 위치 Node 번호 (key)
  robot1Pos: number[];
  robot2Pos: number[];
  robot3Pos: number[];
  robot4Pos: number[];
}

const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({ data, obj, robot1Pos, robot2Pos, robot3Pos, robot4Pos }) => {

  const [r1Pos, setR1Pos] = useState({
    x: robot1Pos[0],
    y: robot1Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = robot1Pos[0] * 35;
    const newY = 1000 - (robot1Pos[1] * 54) - 170;
  
    // Set the new position directly
    setR1Pos({ x: newX, y: newY });
  }, [robot1Pos]);

  const [r2Pos, setR2Pos] = useState({
    x: robot2Pos[0],
    y: robot2Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = robot2Pos[0] * 35;
    const newY = 1000 - (robot2Pos[1] * 54) - 170;
  
    // Set the new position directly
    setR2Pos({ x: newX, y: newY });
  }, [robot2Pos]);


  const [r3Pos, setR3Pos] = useState({
    x: robot3Pos[0],
    y: robot3Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = robot3Pos[0] * 35;
    const newY = 1000 - (robot3Pos[1] * 54) - 170;
  
    // Set the new position directly
    setR3Pos({ x: newX, y: newY });
  }, [robot3Pos]);

  const [r4Pos, setR4Pos] = useState({
    x: robot4Pos[0],
    y: robot4Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = robot4Pos[0] * 35;
    const newY = 1000 - (robot4Pos[1] * 54) - 170;
  
    // Set the new position directly
    setR4Pos({ x: newX, y: newY });
  }, [robot4Pos]);


  const layerRef = useRef<Konva.Layer | null>(null);


  useEffect(() => {
    if(layerRef.current) {
      const stage = new Konva.Stage({
        container: "coordinate-plane-container",
        width: 1890,
        height: 1000,
      });
      const layer = layerRef.current;

      var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: '#1e293b'
      });
      layer.add(background);

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

        const point1 = new Konva.Circle({
          x: 650,
          y: 50,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 650,
          y: 160,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 650,
          y: 95,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 650,
          y: 115,
          fill: "blue",
          radius: 4,
        });

        const point1x = new Konva.Circle({
          x: stage.width() - 385,
          y: 50,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 385,
          y: 160,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 385,
          y: 95,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 385,
          y: 115,
          fill: "blue",
          radius: 4,
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(xAxis3);
        layer.add(xAxis4);
        layer.add(yAxis1);
        layer.add(yAxis2);
        layer.add(point1);
        layer.add(point2);
        layer.add(point3);
        layer.add(point4);
        layer.add(point1x);
        layer.add(point2x);
        layer.add(point3x);
        layer.add(point4x);
        for (let i = 0; i < 8; i++) {
          layer.add(
            new Konva.Line({
              points: [705 + 100 * i, 50, 705 + 100 * i, 160],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 705 + 100 * i,
              y: 50,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 705 + 100 * i,
              y: 160,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 705 + 100 * i,
              y: 95,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 705 + 100 * i,
              y: 115,
              fill: "blue",
              radius: 4,
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
          points: [650, 415, stage.width() - 385, 415],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [650, 440, stage.width() - 385, 440],
          stroke: "orange",
        });

        const xAxis4 = new Konva.Line({
          points: [650, 485, stage.width() - 385, 485],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [650, 365, 650, 485],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 385, 365, stage.width() - 385, 485],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 650,
          y: 365,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 650,
          y: 415,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 650,
          y: 440,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 650,
          y: 485,
          fill: "blue",
          radius: 4,
        });

        const point1x = new Konva.Circle({
          x: stage.width() - 385,
          y: 365,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 385,
          y: 415,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 385,
          y: 440,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 385,
          y: 485,
          fill: "blue",
          radius: 4,
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(xAxis3);
        layer.add(xAxis4);
        layer.add(yAxis1);
        layer.add(yAxis2);
        layer.add(point1);
        layer.add(point2);
        layer.add(point3);
        layer.add(point4);
        layer.add(point1x);
        layer.add(point2x);
        layer.add(point3x);
        layer.add(point4x);
        for (let i = 0; i < 8; i++) {
          layer.add(
            new Konva.Line({
              points: [700 + 100 * i, 365, 700 + 100 * i, 485],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 365,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 415,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 440,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 485,
              fill: "blue",
              radius: 4,
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

        const point1 = new Konva.Circle({
          x: 650,
          y: 680,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: stage.width() - 385,
          y: 680,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 650,
          y: 720,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: stage.width() - 385,
          y: 720,
          fill: "blue",
          radius: 4,
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(yAxis1);
        layer.add(yAxis2);
        layer.add(point1);
        layer.add(point2);
        layer.add(point3);
        layer.add(point4);
        for (let i = 0; i < 8; i++) {
          layer.add(
            new Konva.Line({
              points: [700 + 100 * i, 680, 700 + 100 * i, 720],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 680,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 700 + 100 * i,
              y: 720,
              fill: "blue",
              radius: 4,
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
      // 팔레타이저
      {

        const p1 = new Konva.Rect({
          x: 190,
          y: 600,
          width: 35,
          height: 35,
          fill: '#aaa',
          stroke: '#aaa'
        })
        // const label1 = new Konva.Label({
        //   x: 200,
        //   y: 610,
        //   draggable: true,
        // });

        // label1.add(
        //   new Konva.Text({
        //     text: "P1",
        //     fontSize: 15,
        //     lineHeight: 1.2,
        //     fill: "#000",
        //   })
        // );

        layer.add(p1);
        // layer.add(label1);
      }

      // Draw points and edges
      data.forEach((point) => {
        const [x, y] = point.pos;

        // Scale the coordinates to fit within the screen
        // const scaledX = (x / maxCoordinate) * stage.width();
        const scaledX = x * 35;
        // const scaledY = (y / maxCoordinate) * stage.height();
        const scaledY = (y * 54) + 170;

        // Draw a circle for the point
        const circle = new Konva.Circle({
          x: scaledX,
          y: stage.height() - scaledY,
          radius: DOT_RADIUS,
          fill:
            point.name === 500 || point.name === 501
              ? "purple"
              : point.name >= 1 && point.name <= 58
              ? "orange"
              : "greenyellow",
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
            fill: "white",
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
            const scaledEdgeX = edgeX * 35;
            // const scaledEdgeY = (edgeY / maxCoordinate) * stage.height();
            const scaledEdgeY = (edgeY * 54) + 170;

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

      stage.add(layer);
    }
  }, []);

  return (
    <>
      <div id="coordinate-plane-container">
        <Stage width={window.innerWidth - 30} height={1000}>
          <Layer ref={layerRef}>
            <Circle x={r1Pos.x} y={r1Pos.y} radius={30} fill="red" />
            <Circle x={r2Pos.x} y={r2Pos.y} radius={30} fill="orange" />
            <Circle x={r3Pos.x} y={r3Pos.y} radius={30} fill="yellow" />
            <Circle x={r4Pos.x} y={r4Pos.y} radius={30} fill="green" />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CoordinatePlane;

import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Line } from "react-konva";
import { IFrame } from "konva/lib/types";

const MAX_COORDINATE = 70;
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
  // obj: ObjectProps;
  // robot1: string; // robot1의 위치 Node 번호 (key)
  // robot1Pos: number[];
  // robot2Pos: number[];
  // robot3Pos: number[];
  // robot4Pos: number[];
}

const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({ data }) => {

  const layerRef = useRef<Konva.Layer | null>(null);


  useEffect(() => {
    if(layerRef.current) {
      const stage = new Konva.Stage({
        container: "coordinate-plane-container",
        width: 1890,
        height: 1000,
      });
      const layer = layerRef.current;

      // TODO 네모 박스 추가하기... 
      // 우측 1번째
      {
        const xAxis1 = new Konva.Line({
          // x1, y1, x2, y2, x3, y3
          points: [770, 50, stage.width() - 460, 50],
          stroke: "red",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 160, stage.width() - 460, 160],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [770, 95, stage.width() - 460, 95],
          stroke: "red",
        });

        const xAxis4 = new Konva.Line({
          points: [770, 115, stage.width() - 460, 115],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 50, 770, 160],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 460, 50, stage.width() - 460, 160],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 770,
          y: 50,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 770,
          y: 160,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 770,
          y: 95,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 770,
          y: 115,
          fill: "blue",
          radius: 4,
        });

        const point1x = new Konva.Circle({
          x: stage.width() - 460,
          y: 50,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 460,
          y: 160,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 460,
          y: 95,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 460,
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
        for (let i = 0; i < 4; i++) {
          layer.add(
            new Konva.Line({
              points: [850 + 145 * i, 50, 850 + 145 * i, 160],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 50,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 160,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 95,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
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
          points: [770, 340, stage.width() - 460, 340],
          stroke: "red",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 470, stage.width() - 460, 470],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [770, 395, stage.width() - 460, 395],
          stroke: "red",
        });

        const xAxis4 = new Konva.Line({
          points: [770, 415, stage.width() - 460, 415],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 340, 770, 470],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 460, 340, stage.width() - 460, 470],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 770,
          y: 340,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 770,
          y: 470,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 770,
          y: 415,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 770,
          y: 395,
          fill: "blue",
          radius: 4,
        });

        const point1x = new Konva.Circle({
          x: stage.width() - 460,
          y: 340,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 460,
          y: 470,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 460,
          y: 415,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 460,
          y: 395,
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
        for (let i = 0; i < 4; i++) {
          layer.add(
            new Konva.Line({
              points: [850 + 145 * i, 340, 850 + 145 * i, 470],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 340,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 470,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 415,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 395,
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
          points: [770, 680, stage.width() - 460, 680],
          stroke: "orange",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 720, stage.width() - 460, 720],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 680, 770, 720],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 460, 720, stage.width() - 460, 680],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 770,
          y: 680,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: stage.width() - 460,
          y: 680,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 770,
          y: 720,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: stage.width() - 460,
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
        for (let i = 0; i < 4; i++) {
          layer.add(
            new Konva.Line({
              points: [850 + 145 * i, 680, 850 + 145 * i, 720],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
              y: 680,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 850 + 145 * i,
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
          points: [570, 140, 520, 140],
          stroke: "orange",
        });

        const xAxis2 = new Konva.Line({
          points: [570, 390, 520, 390],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [570, 260, 520, 260],
          stroke: "orange",
        });

        const yAxis1 = new Konva.Line({
          points: [570, 140, 570, 390],
          stroke: "orange",
        });

        const yAxis2 = new Konva.Line({
          points: [520, 140, 520, 390],
          stroke: "orange",
        });

        const point1 = new Konva.Circle({
          x: 570,
          y: 140,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 520,
          y: 140,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 520,
          y: 260,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 570,
          y: 390,
          fill: "blue",
          radius: 4,
        });

        const point5 = new Konva.Circle({
          x: 570,
          y: 260,
          fill: "blue",
          radius: 4,
        });

        const point6 = new Konva.Circle({
          x: 520,
          y: 390,
          fill: "blue",
          radius: 4,
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(xAxis3);
        layer.add(yAxis1);
        layer.add(yAxis2);
        layer.add(point1);
        layer.add(point2);
        layer.add(point3);
        layer.add(point4);
        layer.add(point5);
        layer.add(point6);
      }

      // // 좌측 2번째
      // {
      //   const xAxis1 = new Konva.Line({
      //     // x1, y1, x2, y2, x3, y3
      //     points: [210, 535, 350, 535],
      //     stroke: "orange",
      //   });

      //   const xAxis2 = new Konva.Line({
      //     points: [210, 690, 350, 690],
      //     stroke: "orange",
      //   });

      //   const yAxis1 = new Konva.Line({
      //     points: [210, 535, 210, 690],
      //     stroke: "orange",
      //   });

      //   const yAxis2 = new Konva.Line({
      //     points: [350, 535, 350, 690],
      //     stroke: "orange",
      //   });

      //   layer.add(xAxis1);
      //   layer.add(xAxis2);
      //   layer.add(yAxis1);
      //   layer.add(yAxis2);
      // }

      // Draw points and edges
      data.forEach((point) => {
        const [x, y] = point.pos;

        // Scale the coordinates to fit within the screen
        // const scaledX = (x / maxCoordinate) * stage.width();
        const scaledX = (x / MAX_COORDINATE) * 3400 - 100;
        // const scaledY = (y / maxCoordinate) * stage.height();
        const scaledY = (y / MAX_COORDINATE) * 4000 + 170;

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
            const scaledEdgeX = (edgeX / MAX_COORDINATE) * 3400 - 100;
            // const scaledEdgeY = (edgeY / maxCoordinate) * stage.height();
            const scaledEdgeY = (edgeY / MAX_COORDINATE) * 4000 + 170;

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
            {/* <Circle x={r1Pos.x} y={r1Pos.y} radius={30} fill="red" />
            <Circle x={r2Pos.x} y={r2Pos.y} radius={30} fill="orange" />
            <Circle x={r3Pos.x} y={r3Pos.y} radius={30} fill="yellow" />
            <Circle x={r4Pos.x} y={r4Pos.y} radius={30} fill="green" /> */}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CoordinatePlane;

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
  // obj: ObjectProps;
  // robot1: string; // robot1의 위치 Node 번호 (key)
  robot5Pos: number[];
  robot6Pos: number[];
  robot7Pos: number[];
}

const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({ data, robot5Pos, robot6Pos, robot7Pos }) => {

  const layerRef = useRef<Konva.Layer | null>(null);

  const [r5Pos, setr5Pos] = useState({
    x: robot5Pos[0],
    y: robot5Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = (robot5Pos[0] * 66) - 210;
    const newY = 1000 - (robot5Pos[1] * 65) - 140;
  
    // Set the new position directly
    setr5Pos({ x: newX, y: newY });
  }, [robot5Pos]);
  

  const [r6Pos, setr6Pos] = useState({
    x: robot6Pos[0],
    y: robot6Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = (robot6Pos[0] * 66) - 210;
    const newY = 1000 - (robot6Pos[1] * 65) - 140;
  
    // Set the new position directly
    setr6Pos({ x: newX, y: newY });
  }, [robot6Pos]);
  


  const [r7Pos, setr7Pos] = useState({
    x: robot7Pos[0],
    y: robot7Pos[1]
  })

  useEffect(() => {
    // Calculate the new position without animation
    const newX = (robot7Pos[0] * 66) - 210;
    const newY = 1000 - (robot7Pos[1] * 65) - 140;
  
    // Set the new position directly
    setr7Pos({ x: newX, y: newY });
  }, [robot7Pos]);


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
          points: [770, 50, stage.width() - 435, 50],
          stroke: "red",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 160, stage.width() - 435, 160],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [770, 95, stage.width() - 435, 95],
          stroke: "red",
        });

        const xAxis4 = new Konva.Line({
          points: [770, 115, stage.width() - 435, 115],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 50, 770, 160],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 435, 50, stage.width() - 435, 160],
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
          x: stage.width() - 435,
          y: 50,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 435,
          y: 160,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 435,
          y: 95,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 435,
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
              points: [820 + 165 * i, 50, 820 + 165 * i, 160],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 50,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 160,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 95,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
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
          points: [770, 360, stage.width() - 435, 360],
          stroke: "red",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 480, stage.width() - 435, 480],
          stroke: "orange",
        });

        const xAxis3 = new Konva.Line({
          points: [770, 405, stage.width() - 435, 405],
          stroke: "red",
        });

        const xAxis4 = new Konva.Line({
          points: [770, 425, stage.width() - 435, 425],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 360, 770, 480],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 435, 360, stage.width() - 435, 480],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 770,
          y: 360,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: 770,
          y: 480,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 770,
          y: 425,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: 770,
          y: 405,
          fill: "blue",
          radius: 4,
        });

        const point1x = new Konva.Circle({
          x: stage.width() - 435,
          y: 360,
          fill: "blue",
          radius: 4,
        });
        const point2x = new Konva.Circle({
          x: stage.width() - 435,
          y: 480,
          fill: "blue",
          radius: 4,
        });
        const point3x = new Konva.Circle({
          x: stage.width() - 435,
          y: 425,
          fill: "blue",
          radius: 4,
        });
        const point4x = new Konva.Circle({
          x: stage.width() - 435,
          y: 405,
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
              points: [820 + 165 * i, 360, 820 + 165 * i, 480],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 360,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 480,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 425,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 405,
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
          points: [770, 670, stage.width() - 435, 670],
          stroke: "orange",
        });

        const xAxis2 = new Konva.Line({
          points: [770, 700, stage.width() - 435, 700],
          stroke: "red",
        });

        const yAxis1 = new Konva.Line({
          points: [770, 670, 770, 700],
          stroke: "blue",
        });

        const yAxis2 = new Konva.Line({
          points: [stage.width() - 435, 700, stage.width() - 435, 670],
          stroke: "blue",
        });

        const point1 = new Konva.Circle({
          x: 770,
          y: 670,
          fill: "blue",
          radius: 4,
        });
        const point2 = new Konva.Circle({
          x: stage.width() - 435,
          y: 670,
          fill: "blue",
          radius: 4,
        });
        const point3 = new Konva.Circle({
          x: 770,
          y: 700,
          fill: "blue",
          radius: 4,
        });
        const point4 = new Konva.Circle({
          x: stage.width() - 435,
          y: 700,
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
              points: [820 + 165 * i, 670, 820 + 165 * i, 700],
              stroke: "blue",
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 670,
              fill: "blue",
              radius: 4,
            })
          );
          layer.add(
            new Konva.Circle({
              x: 820 + 165 * i,
              y: 700,
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

      // 좌측 2번째 (하) palletizer
      {
        const xAxis1 = new Konva.Line({
          // x1, y1, x2, y2, x3, y3
          points: [180, 600, 320, 600],
          stroke: "#eee",
        });

        const xAxis2 = new Konva.Line({
          points: [180, 690, 320, 690],
          stroke: "#eee",
        });

        const yAxis1 = new Konva.Line({
          points: [180, 600, 180, 690],
          stroke: "#eee",
        });

        const yAxis2 = new Konva.Line({
          points: [320, 600, 320, 690],
          stroke: "#eee",
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(yAxis1);
        layer.add(yAxis2);
      }

      // 좌측 3번째 (상) palletizer
      {
        const xAxis1 = new Konva.Line({
          // x1, y1, x2, y2, x3, y3
          points: [80, 120, 320, 120],
          stroke: "#eee",
        });

        const xAxis2 = new Konva.Line({
          points: [80, 240, 320, 240],
          stroke: "#eee",
        });

        const yAxis1 = new Konva.Line({
          points: [80, 120, 80, 240],
          stroke: "#eee",
        });

        const yAxis2 = new Konva.Line({
          points: [320, 120, 320, 240],
          stroke: "#eee",
        });

        layer.add(xAxis1);
        layer.add(xAxis2);
        layer.add(yAxis1);
        layer.add(yAxis2);
      }

      {
        const p2 = new Konva.Rect({
          x: 200,
          y: 160,
          width: 35,
          height: 35,
          fill: '#aaa',
          stroke: '#aaa'
        })
        
        const label1 = new Konva.Label({
          x: 210,
          y: 170,
          draggable: true,
        });

        // label1.add(
        //   new Konva.Text({
        //     text: 'P2',
        //     fontSize: 15,
        //     lineHeight: 1.2,
        //     fill: "#000",
        //   })
        // );

        layer.add(p2);
        // layer.add(label1);

        const p3 = new Konva.Rect({
          x: 200,
          y: 640,
          width: 35,
          height: 35,
          fill: '#aaa',
          stroke: '#aaa'
        })

        // const label2 = new Konva.Label({
        //   x: 210,
        //   y: 650,
        //   draggable: true,
        // });

        // label2.add(
        //   new Konva.Text({
        //     text: 'P3',
        //     fontSize: 15,
        //     lineHeight: 1.2,
        //     fill: "#000",
        //   })
        // );

        layer.add(p3);
        // layer.add(label2);
      }
      // Draw points and edges
      data.forEach((point) => {
        const [x, y] = point.pos;

        // Scale the coordinates to fit within the screen
        // const scaledX = (x / maxCoordinate) * stage.width();
        const scaledX = (x * 66) - 210;
        // const scaledY = (y / maxCoordinate) * stage.height();
        const scaledY = (y * 65) + 140;

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
            const scaledEdgeX = (edgeX * 66) - 210;
            // const scaledEdgeY = (edgeY / maxCoordinate) * stage.height();
            const scaledEdgeY = (edgeY * 65) + 140;

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
            <Circle x={r5Pos.x} y={r5Pos.y} radius={30} fill="red" />
            <Circle x={r6Pos.x} y={r6Pos.y} radius={30} fill="orange" />
            <Circle x={r7Pos.x} y={r7Pos.y} radius={30} fill="yellow" />
            {/* <Circle x={r4Pos.x} y={r4Pos.y} radius={30} fill="green" /> */}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CoordinatePlane;

import { ReactNode, useEffect, useRef, useState } from "react";
import "./styles.css";

export interface ItemProps {
  x: number;
  y: number;
  children: ReactNode;
}

export interface Size {
  width: number;
  height: number;
}

export function Item(props: ItemProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.y,
        left: props.x,
        whiteSpace: "pre"
      }}
    >
      {props.children}
    </div>
  );
}

export interface ContainerProps {
  children?: ReactNode;
}

export function Container(props: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    const elm = ref.current;
    if (!elm) return;
    const elmRect = elm.getBoundingClientRect();

    let width = 0;
    let height = 0;
    elm!.childNodes.forEach((child) => {
      const rect = (child as HTMLDivElement).getBoundingClientRect();
      const w = rect.x + rect.width - elmRect.left;
      const h = rect.y + rect.height - elmRect.top;

      if (w > width) width = w;
      if (h > height) height = h;
    });

    setSize({ width, height });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        border: "1px solid blue",
        top: 15,
        left: 50,
        width: size?.width,
        height: size?.height
      }}
    >
      {props.children}
    </div>
  );
}

export default function App() {
  return (
    <Container>
      <Item x={100} y={200}>
        ini item1
      </Item>
      <Item x={300} y={300}>
        ini item2 yang isinya panjang
      </Item>
    </Container>
  );
}

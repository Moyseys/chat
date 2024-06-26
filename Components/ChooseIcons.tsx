import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Bird, Origami, Dog, Rat, Snail } from 'lucide-react';
import sty from "../styles/icons.module.css"
export default function ChooseIcons() {

  const size = "30"
  const list = [
    {
      icon: <Bird size={size} />,
      id: "papagaio",
    },
    {
      icon: <Origami size={size} />,
      id: "papagaio",
    },
    {
      icon: <Dog size={size} />,
      id: "papagaio",
    },
    {
      icon: <Rat size={size} />,
      id: "papagaio",
    },
    {
      icon: <Snail size={size} />,
      id: "papagaio",
    },
  ];

  return (
    <>
      <div className={sty.container}>
        {list.map((item, index) => (
          <Card className={sty.iconCard} key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <div
                className={sty.icon}>
                {item.icon}
              </div>
            </CardBody>
          </Card>
        ))}
      </div >
    </>
  );
}

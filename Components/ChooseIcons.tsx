import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Bird, Origami, Dog, Rat, Snail, Cat } from 'lucide-react';
import sty from "../styles/icons.module.css";

export default function ChooseIcons() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const size = "30";
  const list = [
    {
      icon: <Bird size={size} />,
      id: "papagaio",
    },
    {
      icon: <Origami size={size} />,
      id: "origami",
    },
    {
      icon: <Dog size={size} />,
      id: "dog",
    },
    {
      icon: <Rat size={size} />,
      id: "rat",
    },
    {
      icon: <Snail size={size} />,
      id: "snail",
    },
    {
      icon: <Cat size={size} />,
      id: "cat",
    },
  ];

  const handleIconClick = (id:any) => {
    setSelectedIcon(id);
  };

  return (
    <div className={sty.container}>
      {list.map((item, index) => (
        <Card
          isPressable
          isDisabled={selectedIcon === item.id}
          className={sty.iconCard}
          key={index}
          onClick={() => handleIconClick(item.id)}
        >
          <CardBody className="overflow-visible p-0">
            <div className={sty.icon}>
              {item.icon}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

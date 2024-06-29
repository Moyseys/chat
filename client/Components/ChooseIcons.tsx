import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import sty from "../styles/icons.module.css";
import listIcons from '@/utils/iconsArray';

export default function ChooseIcons({ selectedIcon, setSelectedIcon }: { selectedIcon: any, setSelectedIcon: any }) {

  const handleIconClick = (id: any) => {
    setSelectedIcon(id);
  };

  return (
    <div className={sty.container}>
      {listIcons.map((item, index) => (
        <Card
          isPressable
          isBlurred
          isFooterBlurred
          isHoverable
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

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function navbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">chat</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat">
            logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

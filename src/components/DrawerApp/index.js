import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import clsx from "clsx";
// import { useSelector } from "react-redux";
import {
  Drawer,
  ListItem,
  IconButton,
  Divider,
  Collapse,
  List,
} from "@material-ui/core";
import {
  ArrowForwardIos,
  ArrowBackIos,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { SvgIcon } from "@material-ui/core";

import { ReactComponent as iconProduct } from "../../assets/icons/anel.svg";
import { ReactComponent as iconOrder } from "../../assets/icons/carrinho.svg";
import { ReactComponent as iconClient } from "../../assets/icons/perfil.svg";
import { ReactComponent as circle } from "../../assets/icons/circle.svg";
import { ReactComponent as iconStock } from "../../assets/icons/pedido.svg";
import { ReactComponent as Cupons } from "../../assets/icons/home.svg";
import { ReactComponent as iconCollaborators } from "../../assets/icons/home2.svg";
import { ReactComponent as Permissoes } from "../../assets/icons/troca.svg";

import { ListContainer, Logo, LogoContainer } from "./styles";

import TalismaLogo from "../../assets/images/logo.png";
import TalismaLogoIcon from "../../assets/images/logoIcon.png";

const useStyles = makeStyles((theme) => ({
  menuClose: {
    width: "5rem",
    minWidth: "5rem",
    maxWidth: "5rem",
  },
  menuOpen: {
    minWidth: "19.5rem",
    width: "19.5rem",
  },
  sidebar: {
    height: "100%",
  },
  listItem: {
    display: "flex",
    flex: "column",
  },
}));

function DrawerApp({ open, setOpen }) {
  const [menuItens, setMenuItens] = useState([]);
  const pathnamePage = window.location.pathname;

  const classes = useStyles();
  useEffect(() => {
    setMenuItens([
      {
        label: "Produtos",
        path: "/produtos",
        key: "produtos",
        icon: <SvgIcon component={iconProduct} viewBox="0 0 24 24" />,
      },
      {
        label: "Clientes",
        path: "/clientes",
        key: "clientes",
        icon: <SvgIcon component={iconClient} viewBox="0 0 24 24" />,
        subItem: [
          {
            label: "Clientes",
            path: "/clientes/clientes",
            key: "clientes/clientes",
            icon: <SvgIcon component={circle} viewBox="0 0 24 24" />,
          },
          {
            label: "Tipos de cliente",
            path: "/clientes/tipo",
            key: "clientes/tipo",
            icon: <SvgIcon component={circle} viewBox="0 0 24 24" />,
          },
        ],
      },
    ]);

    return () => {
      setMenuItens([]);
    };
  }, [pathnamePage]);

  const handleMenuClick = (subItem) => {
    const items = menuItens.map((item) => {
      if (item.key === subItem.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setMenuItens(items);
    if (!open) {
      setOpen();
    }
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.menuOpen]: open,
        [classes.menuClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.menuOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <LogoContainer>
        <Logo
          src={open ? TalismaLogo : TalismaLogoIcon}
          style={{ width: open ? "50%" : "58px" }}
        />
      </LogoContainer>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <IconButton
          onClick={setOpen}
          style={{
            borderColor: "grey.300",
            borderWidth: "1px",
            borderStyle: "solid",
            margin: "10px 0px",
          }}
        >
          {open ? (
            <SvgIcon viewBox="0 0 16 24">
              <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
            </SvgIcon>
          ) : (
            <ArrowForwardIos />
          )}
        </IconButton>
      </div>
      <div style={{ padding: "16px" }}>
        <Divider />
      </div>
      {/* <ProfileHeader /> */}
      <ListContainer
        className={classes.sidebar}
        style={{ width: open ? "19.5rem" : "5rem" }}
      >
        {menuItens.map((item) => (
          <>
            {!item.subItem ? (
              <ListItem
                component={Link}
                to={item.path}
                button
                key={item.path}
                selected={pathnamePage.includes(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </ListItem>
            ) : (
              <>
                <ListItem
                  component={!item.subItem && Link}
                  button
                  style={{ flexDirection: open ? "row" : "column" }}
                  key={item.path}
                  selected={pathnamePage.includes(item.path)}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.icon}
                  {open && <span>{item.label}</span>}
                  <div>
                    {item.subItem && (
                      <>{item.expand ? <ExpandLess /> : <ExpandMore />}</>
                    )}
                  </div>
                </ListItem>
                <Collapse
                  in={!item.expanded && open}
                  timeout="auto"
                  unmountOnExit
                >
                  <ListContainer>
                    {item?.subItem &&
                      item.subItem.map((subItem) => (
                        <ListItem
                          component={Link}
                          to={subItem.path}
                          button
                          key={subItem.path}
                          selected={pathnamePage.includes(subItem.path)}
                          style={{
                            display: "flex",
                            marginLeft: "20px",
                            alignItems: "center",
                          }}
                        >
                          {subItem.icon}
                          <span style={{ margin: "0px", marginTop: "-14px" }}>
                            {subItem.label}
                          </span>
                        </ListItem>
                      ))}
                  </ListContainer>
                </Collapse>
              </>
            )}
          </>
        ))}
      </ListContainer>
    </Drawer>
  );
}

export { DrawerApp };

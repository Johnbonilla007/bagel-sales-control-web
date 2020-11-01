/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  List,
  ListItem,
  Button,
  colors,
  AccordionSummary,
  AccordionActions
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import { SideBarStyled } from './styles';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },

  iconSubMenu: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    },
    acordionSummary: { margin: 0 }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { showSubMenu, setShowSubMenu } = useState(false);

  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <SideBarStyled>
      <List {...rest} className={clsx(classes.root, className)}>
        {pages.map(page => (
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Accordion
              expanded={showSubMenu}
              square
              onChange={() => setShowSubMenu && setShowSubMenu(true)}>
              {page.subMenu ? (
                <AccordionSummary className={classes.acordionSummary}>
                  <div className={classes.iconSubMenu}>{page.icon}</div>
                  {page.title}
                </AccordionSummary>
              ) : (
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  style={{ width: '200px' }}
                  to={page.href}>
                  <div className={classes.icon}>{page.icon}</div>
                  {page.title}
                </Button>
              )}

              {page.subMenu &&
                page.subMenu.map(item => (
                  <AccordionActions>
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      component={CustomRouterLink}
                      style={{ paddingLeft: 28, width: '200px' }}
                      to={item.href}>
                      <div className={classes.icon}>{item.icon}</div>
                      {item.title}
                    </Button>
                  </AccordionActions>
                ))}
            </Accordion>
          </ListItem>
        ))}
      </List>
    </SideBarStyled>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;

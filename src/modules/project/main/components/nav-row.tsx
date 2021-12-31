//@ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faColumns, faFeatherAlt, faCalendarAlt, faCube, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { useStyles } from '../styles';

interface Props {
  name: string;
  setComponent(): void;
}

const iconMap = {
  'Active Sprints': faFeatherAlt,
  Board: faColumns,
  Tickets: faStickyNote,
  Sprints: faCalendarAlt,
  Projects: faCube
};

const NavRow: React.FC<Props> = ({ name, setComponent }) => {
  const classes = useStyles();

  return (
    <div className={classes.navRow} onClick={setComponent}>
      <div style={{ width: 25 }}>
        <FontAwesomeIcon icon={iconMap[name]} />
      </div>
      
      {name}
    </div>
  );
};

export default NavRow;

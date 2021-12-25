//@ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faColumns, faFeatherAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { useStyles } from '../styles';

interface Props {
  name: string;
}

const iconMap = {
  'Active Sprint': faFeatherAlt,
  Board: faColumns,
  Backlog: faAlignJustify,
  Sprints: faCalendarAlt,
};

const NavRow: React.FC<Props> = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.navRow}>
      <div style={{ width: 25 }}>
        <FontAwesomeIcon icon={iconMap[name]} />
      </div>
      
      {name}
    </div>
  );
};

export default NavRow;

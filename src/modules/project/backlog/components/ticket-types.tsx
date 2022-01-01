import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBug, faCircle } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../../../styles/colors';

interface Props {
  type: string;
}

const TypeIcon: React.FC<Props> = ({ type }) => {
  const renderFeature = () => {
    return (
      <FontAwesomeIcon icon={faBookmark} style={{ fontSize: 20, color: colors.main }} />
    );
  };

  const renderBug = () => {
    return (
      <FontAwesomeIcon icon={faBug} style={{ fontSize: 20, color: colors.red }} />
    );
  };

  const renderTask = () => {
    return (
      <FontAwesomeIcon icon={faCircle} style={{ fontSize: 20, color: colors.greyIcon }} />
    );
  };

  const renderIcon = () => {
    if (type === 'Feature') return renderFeature();
    if (type === 'Bug') return renderBug();
    if (type === 'Task') return renderTask();
  }

  return (
    <div style={{ width: 20, display: 'flex', justifyContent: 'center' }}>
      {renderIcon()}
    </div>
  );
};

export default TypeIcon;
